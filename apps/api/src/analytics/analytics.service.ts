import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

const DAY_MS = 24 * 60 * 60 * 1000;

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * DAY_MS);
}

function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

type GroupCount = { key: string; count: number };

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const [online, todayVisitors, pageviews7d, avgDuration, chatSessions] =
      await Promise.all([
        this.prisma.session.count({
          where: { lastSeen: { gte: new Date(Date.now() - 5 * 60 * 1000) } },
        }),
        this.prisma.session.count({
          where: { lastSeen: { gte: startOfToday() } },
        }),
        this.prisma.pageView.count({
          where: { createdAt: { gte: daysAgo(7) } },
        }),
        this.prisma.pageView.aggregate({
          _avg: { durationMs: true },
          where: { createdAt: { gte: daysAgo(30) }, durationMs: { gt: 0 } },
        }),
        this.prisma.chatSession.count(),
      ]);

    return {
      online,
      todayVisitors,
      pageviews7d,
      avgDurationMs: Math.round(avgDuration._avg.durationMs ?? 0),
      chatSessions,
    };
  }

  async timeseries(days = 30) {
    const rows = await this.prisma.$queryRaw<
      { day: string; pageviews: number; visitors: number }[]
    >`
      SELECT
        to_char(date_trunc('day', "createdAt"), 'YYYY-MM-DD') AS day,
        COUNT(*)::int AS pageviews,
        COUNT(DISTINCT "sessionId")::int AS visitors
      FROM "PageView"
      WHERE "createdAt" >= ${daysAgo(days)}
      GROUP BY 1
      ORDER BY 1
    `;
    return rows;
  }

  private async groupSessions(
    field: 'device' | 'browser' | 'os' | 'country' | 'utmSource',
    days = 30,
  ): Promise<GroupCount[]> {
    const rows = await this.prisma.session.groupBy({
      by: [field],
      _count: { _all: true },
      where: { lastSeen: { gte: daysAgo(days) } },
    });
    return rows
      .map((row) => ({
        key: row[field] ?? 'Không rõ',
        count: row._count._all,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }

  devices() {
    return this.groupSessions('device');
  }

  browsers() {
    return this.groupSessions('browser');
  }

  os() {
    return this.groupSessions('os');
  }

  countries() {
    return this.groupSessions('country');
  }

  utm() {
    return this.groupSessions('utmSource');
  }

  async referrers(days = 30): Promise<GroupCount[]> {
    const rows = await this.prisma.session.groupBy({
      by: ['referrer'],
      _count: { _all: true },
      where: { lastSeen: { gte: daysAgo(days) } },
    });
    return rows
      .map((row) => {
        let key = row.referrer ?? 'Truy cập trực tiếp';
        try {
          if (row.referrer) key = new URL(row.referrer).hostname;
        } catch {
          // giữ nguyên chuỗi gốc nếu không phải URL
        }
        return { key, count: row._count._all };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }

  async pages(days = 30) {
    const rows = await this.prisma.pageView.groupBy({
      by: ['path'],
      _count: { _all: true },
      _avg: { durationMs: true },
      where: { createdAt: { gte: daysAgo(days) } },
    });
    return rows
      .map((row) => ({
        path: row.path,
        views: row._count._all,
        avgDurationMs: Math.round(row._avg.durationMs ?? 0),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);
  }

  async sections(days = 30) {
    const [rows, totalSessions] = await Promise.all([
      this.prisma.$queryRaw<
        {
          path: string;
          sectionId: string;
          reached: number;
          dwellMs: bigint;
          clicks: bigint;
        }[]
      >`
        SELECT
          "path",
          "sectionId",
          COUNT(DISTINCT "sessionId")::int AS reached,
          COALESCE(SUM("dwellMs"), 0)::bigint AS "dwellMs",
          COALESCE(SUM("clicks"), 0)::bigint AS clicks
        FROM "SectionEvent"
        WHERE "createdAt" >= ${daysAgo(days)}
        GROUP BY "path", "sectionId"
      `,
      this.prisma.session.count({
        where: { lastSeen: { gte: daysAgo(days) } },
      }),
    ]);

    return rows
      .map((row) => {
        const reached = Number(row.reached);
        const dwellMs = Number(row.dwellMs);
        return {
          path: row.path || '/',
          sectionId: row.sectionId,
          reached,
          reachPct:
            totalSessions > 0 ? Math.round((reached / totalSessions) * 100) : 0,
          avgDwellMs: reached > 0 ? Math.round(dwellMs / reached) : 0,
          clicks: Number(row.clicks),
        };
      })
      .sort((a, b) => b.avgDwellMs - a.avgDwellMs);
  }
}
