import { Injectable, Logger } from '@nestjs/common';
import type { AiConfig } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export type AiMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type AiConfigDto = {
  enabled?: boolean;
  baseUrl?: string;
  model?: string;
  /** Để trống/không gửi = giữ key cũ */
  apiKey?: string;
  systemPrompt?: string;
};

const REQUEST_TIMEOUT_MS = 25_000;

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(private readonly prisma: PrismaService) {}

  getConfig() {
    return this.prisma.aiConfig.findUnique({ where: { id: 1 } });
  }

  /** Trả về config đã che API key cho admin UI. */
  async getMaskedConfig() {
    const config = await this.getConfig();
    return {
      enabled: config?.enabled ?? false,
      baseUrl: config?.baseUrl ?? '',
      model: config?.model ?? '',
      systemPrompt: config?.systemPrompt ?? '',
      apiKeySet: Boolean(config?.apiKey),
    };
  }

  async saveConfig(dto: AiConfigDto) {
    const current = await this.getConfig();
    const apiKey =
      dto.apiKey !== undefined && dto.apiKey !== ''
        ? dto.apiKey.trim()
        : (current?.apiKey ?? '');

    await this.prisma.aiConfig.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        enabled: dto.enabled ?? false,
        baseUrl: (dto.baseUrl ?? '').trim(),
        model: (dto.model ?? '').trim(),
        apiKey,
        systemPrompt: dto.systemPrompt ?? '',
      },
      update: {
        ...(dto.enabled !== undefined ? { enabled: dto.enabled } : {}),
        ...(dto.baseUrl !== undefined ? { baseUrl: dto.baseUrl.trim() } : {}),
        ...(dto.model !== undefined ? { model: dto.model.trim() } : {}),
        apiKey,
        ...(dto.systemPrompt !== undefined
          ? { systemPrompt: dto.systemPrompt }
          : {}),
      },
    });
    return this.getMaskedConfig();
  }

  isReady(config: AiConfig | null): config is AiConfig {
    return Boolean(
      config?.enabled && config.baseUrl && config.model && config.apiKey,
    );
  }

  /** Gọi endpoint chat/completions chuẩn OpenAI (OpenAI, Groq, OpenRouter, Ollama…). */
  async generate(
    config: AiConfig,
    messages: AiMessage[],
  ): Promise<string | null> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const baseUrl = config.baseUrl.replace(/\/+$/, '');
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.model,
          messages,
          temperature: 0.6,
          max_tokens: 700,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        this.logger.warn(`AI provider trả về ${res.status}`);
        return null;
      }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const content = json.choices?.[0]?.message?.content?.trim();
      return content || null;
    } catch (error) {
      this.logger.warn(
        `Gọi AI thất bại: ${error instanceof Error ? error.message : 'unknown'}`,
      );
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  /** Kiểm tra kết nối với cấu hình hiện tại. */
  async test() {
    const config = await this.getConfig();
    if (!this.isReady(config)) {
      return {
        ok: false,
        error: 'Chưa đủ cấu hình (bật AI, base URL, model, API key)',
      };
    }
    const reply = await this.generate(config, [
      {
        role: 'user',
        content: 'Chào bạn, hãy trả lời ngắn gọn: "Kết nối thành công".',
      },
    ]);
    return reply
      ? { ok: true, reply }
      : { ok: false, error: 'Không gọi được model — kiểm tra URL/key/model' };
  }
}
