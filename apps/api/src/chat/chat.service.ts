import { Injectable } from '@nestjs/common';
import { AiService, type AiMessage } from '../ai/ai.service';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { PrismaService } from '../prisma.service';

const FALLBACK_REPLY =
  'Cảm ơn bạn đã nhắn tin! Mình chưa có thông tin cho câu hỏi này. Bạn có thể liên hệ email contact@riviu.vn hoặc hotline 028 62725439 (giờ hành chính) để được đội ngũ Riviu hỗ trợ trực tiếp nhé.';

const DEFAULT_SYSTEM_PROMPT =
  'Bạn là "Trợ lý Riviu" — trợ lý ảo của Riviu Đà Lạt (Công ty TNHH RIVICO), công ty truyền thông F&B. ' +
  'Trả lời NGẮN GỌN, thân thiện, bằng tiếng Việt, đúng trọng tâm câu hỏi. ' +
  'Chỉ dùng thông tin trong phần KIẾN THỨC bên dưới; tuyệt đối không bịa giá hay dịch vụ. ' +
  'Khi khách hỏi bảng giá chung: chỉ liệt kê TÊN các nhóm (combo Facebook, Facebook tháng, TikTok, duyệt bài, xây kênh, dịch vụ lẻ, KOL) và hỏi muốn xem nhóm nào — không đổ hết giá vào một câu. ' +
  'Nếu không có thông tin phù hợp, mời khách liên hệ email contact@riviu.vn hoặc hotline 028 62725439.';

const HISTORY_LIMIT = 10;

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly knowledge: KnowledgeService,
    private readonly ai: AiService,
  ) {}

  /**
   * Trả lời khách: ưu tiên AI (nếu admin đã cấu hình) với ngữ cảnh là kho
   * kiến thức; AI tắt/lỗi thì khớp từ khóa; cuối cùng là câu fallback.
   */
  async answer(sessionId: string, message: string) {
    const content = message?.trim().slice(0, 2000);
    if (!sessionId || !content) {
      return { reply: FALLBACK_REPLY, attachmentUrl: null };
    }

    const safeSession = sessionId.slice(0, 64);
    const history = await this.recentMessages(safeSession);
    await this.log(safeSession, 'user', content, 'user');

    const match = await this.knowledge.findAnswer(content);
    const attachmentUrl = match?.attachmentUrl ?? null;

    let reply: string | null = null;
    let source = 'fallback';

    const config = await this.ai.getConfig();
    if (this.ai.isReady(config)) {
      const context = await this.knowledge.buildContext();
      const messages: AiMessage[] = [
        {
          role: 'system',
          content: `${config.systemPrompt.trim() || DEFAULT_SYSTEM_PROMPT}\n\n=== KIẾN THỨC ===\n${context}`,
        },
        ...history,
        { role: 'user', content },
      ];
      reply = await this.ai.generate(config, messages);
      if (reply) source = 'ai';
    }

    if (!reply && match) {
      reply = match.content;
      source = 'knowledge';
    }
    if (!reply) {
      reply = FALLBACK_REPLY;
    }

    await this.log(
      safeSession,
      'assistant',
      attachmentUrl ? `${reply}\n[Đính kèm: ${attachmentUrl}]` : reply,
      source,
    );

    return { reply, attachmentUrl };
  }

  /** Lịch sử gần nhất của phiên (đúng thứ tự thời gian) làm ngữ cảnh AI. */
  private async recentMessages(sessionId: string): Promise<AiMessage[]> {
    const rows = await this.prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
      take: HISTORY_LIMIT,
    });
    return rows.reverse().map((row) => ({
      role:
        row.role === 'assistant' ? ('assistant' as const) : ('user' as const),
      content: row.content,
    }));
  }

  async log(sessionId: string, role: string, content: string, source?: string) {
    if (!sessionId || !content) return { ok: false };
    const safeRole = role === 'assistant' ? 'assistant' : 'user';

    await this.prisma.chatSession.upsert({
      where: { id: sessionId.slice(0, 64) },
      create: { id: sessionId.slice(0, 64) },
      update: {},
    });

    await this.prisma.chatMessage.create({
      data: {
        sessionId: sessionId.slice(0, 64),
        role: safeRole,
        content: content.slice(0, 16000),
        source: source ?? (safeRole === 'assistant' ? 'fallback' : 'user'),
      },
    });
    return { ok: true };
  }

  async sessions() {
    const sessions = await this.prisma.chatSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: { select: { messages: true } },
      },
    });

    const firstUsers = await this.prisma.chatMessage.findMany({
      where: {
        sessionId: { in: sessions.map((session) => session.id) },
        role: 'user',
      },
      orderBy: { createdAt: 'asc' },
    });
    const firstBySession = new Map<string, string>();
    for (const row of firstUsers) {
      if (!firstBySession.has(row.sessionId)) {
        firstBySession.set(row.sessionId, row.content);
      }
    }

    return sessions.map((session) => ({
      id: session.id,
      createdAt: session.createdAt,
      messageCount: session._count.messages,
      lastMessage: session.messages[0]?.content ?? '',
      lastMessageAt: session.messages[0]?.createdAt ?? session.createdAt,
      firstUserMessage:
        firstBySession.get(session.id) ?? session.messages[0]?.content ?? '',
    }));
  }

  session(id: string) {
    return this.prisma.chatSession.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
  }

  /** Thống kê nhanh để admin biết bot đang trả lời tốt tới đâu. */
  async stats() {
    const [sessions, messages, ai, knowledge, fallback] = await Promise.all([
      this.prisma.chatSession.count(),
      this.prisma.chatMessage.count(),
      this.prisma.chatMessage.count({ where: { source: 'ai' } }),
      this.prisma.chatMessage.count({ where: { source: 'knowledge' } }),
      this.prisma.chatMessage.count({ where: { source: 'fallback' } }),
    ]);
    const answered = ai + knowledge + fallback;
    return {
      sessions,
      messages,
      ai,
      knowledge,
      fallback,
      fallbackRate: answered > 0 ? Math.round((fallback / answered) * 100) : 0,
    };
  }

  /** Xuất toàn bộ hội thoại để phân tích/cải thiện bot. */
  async export(format: 'csv' | 'json'): Promise<string> {
    const messages = await this.prisma.chatMessage.findMany({
      orderBy: [{ sessionId: 'asc' }, { createdAt: 'asc' }],
      take: 10000,
    });

    if (format === 'json') {
      return JSON.stringify(
        messages.map((row) => ({
          sessionId: row.sessionId,
          id: row.id,
          role: row.role,
          source: row.source,
          content: row.content,
          createdAt: row.createdAt.toISOString(),
        })),
        null,
        2,
      );
    }

    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const header = 'sessionId,messageId,role,source,createdAt,content';
    const lines = messages.map((row) =>
      [
        row.sessionId,
        row.id,
        row.role,
        row.source,
        row.createdAt.toISOString(),
        row.content,
      ]
        .map((value) => escape(String(value)))
        .join(','),
    );
    // BOM để Excel mở đúng tiếng Việt
    return '\uFEFF' + [header, ...lines].join('\r\n');
  }
}
