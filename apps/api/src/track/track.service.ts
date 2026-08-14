import { Injectable } from '@nestjs/common';
import * as geoip from 'geoip-lite';
import UAParser from 'ua-parser-js';
import { PrismaService } from '../prisma.service';

export type ViewDto = {
  sessionId?: string;
  path?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type DurationDto = {
  sessionId?: string;
  path?: string;
  durationMs?: number;
};

export type SectionsDto = {
  sessionId?: string;
  path?: string;
  sections?: { sectionId?: string; dwellMs?: number; clicks?: number }[];
};

const MAX_DURATION_MS = 30 * 60 * 1000;

function clampDuration(value: unknown): number {
  const n = typeof value === 'number' && Number.isFinite(value) ? value : 0;
  return Math.max(0, Math.min(Math.round(n), MAX_DURATION_MS));
}

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async view(dto: ViewDto, userAgent: string, ip: string) {
    const sessionId = dto.sessionId?.slice(0, 64);
    const path = dto.path?.slice(0, 512);
    if (!sessionId || !path) return { ok: false };

    const parsed = new UAParser(userAgent).getResult();
    const device = parsed.device.type ?? 'desktop';
    const browser = parsed.browser.name ?? null;
    const os = parsed.os.name ?? null;
    const country = ip ? (geoip.lookup(ip)?.country ?? null) : null;

    await this.prisma.session.upsert({
      where: { id: sessionId },
      create: {
        id: sessionId,
        device,
        browser,
        os,
        country,
        referrer: dto.referrer?.slice(0, 512) || null,
        utmSource: dto.utmSource?.slice(0, 128) || null,
        utmMedium: dto.utmMedium?.slice(0, 128) || null,
        utmCampaign: dto.utmCampaign?.slice(0, 128) || null,
      },
      update: { lastSeen: new Date() },
    });

    await this.prisma.pageView.create({ data: { sessionId, path } });
    return { ok: true };
  }

  async duration(dto: DurationDto) {
    const sessionId = dto.sessionId?.slice(0, 64);
    const path = dto.path?.slice(0, 512);
    const durationMs = clampDuration(dto.durationMs);
    if (!sessionId || !path || durationMs <= 0) return { ok: false };

    const lastView = await this.prisma.pageView.findFirst({
      where: { sessionId, path },
      orderBy: { createdAt: 'desc' },
    });
    if (lastView) {
      await this.prisma.pageView.update({
        where: { id: lastView.id },
        data: { durationMs: { increment: durationMs } },
      });
    }
    await this.touchSession(sessionId);
    return { ok: true };
  }

  async sections(dto: SectionsDto) {
    const sessionId = dto.sessionId?.slice(0, 64);
    if (!sessionId) return { ok: false };
    const path = dto.path?.slice(0, 512) || '/';

    const rows = (dto.sections ?? [])
      .filter((section) => typeof section?.sectionId === 'string')
      .slice(0, 50)
      .map((section) => ({
        sessionId,
        path,
        sectionId: (section.sectionId as string).slice(0, 64),
        dwellMs: clampDuration(section.dwellMs),
        clicks: Math.max(0, Math.min(Math.round(section.clicks ?? 0), 1000)),
      }))
      .filter((row) => row.dwellMs > 0 || row.clicks > 0);

    if (rows.length > 0) {
      // Session có thể chưa tồn tại nếu beacon tới trước pageview
      await this.prisma.session.upsert({
        where: { id: sessionId },
        create: { id: sessionId },
        update: { lastSeen: new Date() },
      });
      await this.prisma.sectionEvent.createMany({ data: rows });
    }
    return { ok: true, saved: rows.length };
  }

  private async touchSession(sessionId: string) {
    await this.prisma.session.updateMany({
      where: { id: sessionId },
      data: { lastSeen: new Date() },
    });
  }
}
