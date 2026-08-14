import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

const MAX_REVISIONS = 20;

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  get(slug: string) {
    return this.prisma.page.findUnique({ where: { slug } });
  }

  async save(slug: string, data: unknown) {
    const json = (data ?? {}) as Prisma.InputJsonValue;

    // Lưu bản hiện tại vào lịch sử trước khi ghi đè
    const existing = await this.prisma.page.findUnique({ where: { slug } });
    if (existing) {
      await this.prisma.pageRevision.create({
        data: { slug, data: existing.data as Prisma.InputJsonValue },
      });
      await this.trimRevisions(slug);
    }

    return this.prisma.page.upsert({
      where: { slug },
      create: { slug, data: json },
      update: { data: json },
    });
  }

  async revisions(slug: string) {
    const rows = await this.prisma.pageRevision.findMany({
      where: { slug },
      orderBy: { createdAt: 'desc' },
      take: MAX_REVISIONS,
      select: { id: true, createdAt: true },
    });
    return rows;
  }

  async restore(slug: string, revisionId: string) {
    const revision = await this.prisma.pageRevision.findUnique({
      where: { id: revisionId },
    });
    if (!revision || revision.slug !== slug) {
      throw new NotFoundException('Không tìm thấy phiên bản này');
    }
    // Bản đang dùng cũng được đưa vào lịch sử để có thể quay lại
    return this.save(slug, revision.data);
  }

  async reset(slug: string) {
    const existing = await this.prisma.page.findUnique({ where: { slug } });
    if (existing) {
      await this.prisma.pageRevision.create({
        data: { slug, data: existing.data as Prisma.InputJsonValue },
      });
      await this.trimRevisions(slug);
      await this.prisma.page.delete({ where: { slug } });
    }
    return { ok: true };
  }

  private async trimRevisions(slug: string) {
    const stale = await this.prisma.pageRevision.findMany({
      where: { slug },
      orderBy: { createdAt: 'desc' },
      skip: MAX_REVISIONS,
      select: { id: true },
    });
    if (stale.length > 0) {
      await this.prisma.pageRevision.deleteMany({
        where: { id: { in: stale.map((row) => row.id) } },
      });
    }
  }
}
