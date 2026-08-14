import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }) {
    const name = body.name?.trim().slice(0, 120) ?? '';
    const email = body.email?.trim().slice(0, 160) ?? '';
    const phone = body.phone?.replace(/\s/g, '').slice(0, 20) ?? '';
    const message = body.message?.trim().slice(0, 4000) ?? '';

    if (!name || !email || !phone || !message) {
      throw new BadRequestException(
        'Điền đủ họ tên, email, số điện thoại và nội dung.',
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Email không hợp lệ.');
    }
    if (phone.replace(/\D/g, '').length < 8) {
      throw new BadRequestException('Số điện thoại không hợp lệ.');
    }

    return this.prisma.contactLead.create({
      data: { name, email, phone, message },
    });
  }

  leads() {
    return this.prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }

  async inbox(since?: string, sinceLeads?: string, sinceChats?: string) {
    const parse = (value?: string) => {
      const date = value ? new Date(value) : new Date(0);
      return Number.isNaN(date.getTime()) ? new Date(0) : date;
    };
    const leadSince = parse(sinceLeads ?? since);
    const chatSince = parse(sinceChats ?? since);

    const [leads, chats, latestLead, latestChat] = await Promise.all([
      this.prisma.contactLead.count({
        where: { createdAt: { gt: leadSince } },
      }),
      this.prisma.chatSession.count({
        where: { messages: { some: { createdAt: { gt: chatSince } } } },
      }),
      this.prisma.contactLead.findFirst({
        where: { createdAt: { gt: leadSince } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.chatMessage.findFirst({
        where: { createdAt: { gt: chatSince }, role: 'user' },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      leads,
      chats,
      latestLead: latestLead
        ? {
            id: latestLead.id,
            name: latestLead.name,
            phone: latestLead.phone,
            createdAt: latestLead.createdAt,
          }
        : null,
      latestChat: latestChat
        ? {
            id: latestChat.sessionId,
            preview: latestChat.content,
            createdAt: latestChat.createdAt,
          }
        : null,
    };
  }
}
