import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { KNOWLEDGE_SEED } from './knowledge.seed';

export type KnowledgeDto = {
  title?: string;
  content?: string;
  keywords?: string;
  attachmentUrl?: string | null;
};

/** Bỏ dấu tiếng Việt + lowercase để so khớp từ khóa. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

@Injectable()
export class KnowledgeService implements OnModuleInit {
  private readonly logger = new Logger(KnowledgeService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Bổ sung các mục kiến thức mặc định còn thiếu (so theo tiêu đề) để bot trả
   * lời được ngay, đồng thời kiến thức mới thêm vào seed vẫn tới được database
   * đã chạy từ trước. Mục admin đã tự sửa giữ nguyên.
   */
  async onModuleInit() {
    const existing = await this.prisma.knowledgeItem.findMany({
      select: { title: true },
    });
    const titles = new Set(existing.map((item) => item.title));
    const missing = KNOWLEDGE_SEED.filter((item) => !titles.has(item.title));
    if (missing.length === 0) return;

    await this.prisma.knowledgeItem.createMany({ data: missing });
    this.logger.log(`Đã seed ${missing.length} mục kiến thức mặc định`);
  }

  /** Toàn bộ kiến thức làm ngữ cảnh cho AI. */
  async listForContext() {
    return this.prisma.knowledgeItem.findMany({
      select: { title: true, content: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  list() {
    return this.prisma.knowledgeItem.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  create(dto: KnowledgeDto) {
    const title = dto.title?.trim();
    const content = dto.content?.trim();
    if (!title || !content) {
      throw new BadRequestException('Thiếu tiêu đề hoặc nội dung');
    }
    return this.prisma.knowledgeItem.create({
      data: {
        title: title.slice(0, 200),
        content: content.slice(0, 8000),
        keywords: (dto.keywords ?? '').slice(0, 500),
        attachmentUrl: dto.attachmentUrl?.slice(0, 512) || null,
      },
    });
  }

  update(id: string, dto: KnowledgeDto) {
    return this.prisma.knowledgeItem.update({
      where: { id },
      data: {
        ...(dto.title ? { title: dto.title.trim().slice(0, 200) } : {}),
        ...(dto.content ? { content: dto.content.trim().slice(0, 8000) } : {}),
        ...(dto.keywords !== undefined
          ? { keywords: dto.keywords.slice(0, 500) }
          : {}),
        ...(dto.attachmentUrl !== undefined
          ? { attachmentUrl: dto.attachmentUrl?.slice(0, 512) || null }
          : {}),
      },
    });
  }

  remove(id: string) {
    return this.prisma.knowledgeItem.delete({ where: { id } });
  }

  /** Ghép toàn bộ kiến thức thành ngữ cảnh cho AI (RAG-lite). */
  async buildContext(): Promise<string> {
    const items = await this.prisma.knowledgeItem.findMany({
      orderBy: { updatedAt: 'desc' },
    });
    if (items.length === 0) return '(chưa có dữ liệu)';
    return items
      .map(
        (item) =>
          `## ${item.title}\n${item.content}${item.attachmentUrl ? `\n(Tài liệu: ${item.attachmentUrl})` : ''}`,
      )
      .join('\n\n');
  }

  /**
   * Tìm mục kiến thức khớp nhất với câu hỏi bằng chấm điểm từ khóa
   * (không cần AI — hoạt động ngay; sau này là ngữ cảnh cho AI thật).
   */
  async findAnswer(message: string) {
    const normalizedMessage = normalize(message);
    if (!normalizedMessage.trim()) return null;

    const items = await this.prisma.knowledgeItem.findMany();
    let best: (typeof items)[number] | null = null;
    let bestScore = 0;

    for (const item of items) {
      let score = 0;

      const keywords = item.keywords
        .split(',')
        .map((keyword) => normalize(keyword.trim()))
        .filter((keyword) => keyword.length > 1);
      for (const keyword of keywords) {
        if (normalizedMessage.includes(keyword)) score += 2;
      }

      const titleWords = normalize(item.title)
        .split(/\s+/)
        .filter((word) => word.length > 2);
      for (const word of titleWords) {
        if (normalizedMessage.includes(word)) score += 1;
      }

      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    }

    return bestScore >= 2 ? best : null;
  }
}
