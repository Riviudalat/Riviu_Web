import {
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Post('chat-log')
  @HttpCode(200)
  log(@Body() body: { sessionId?: string; role?: string; content?: string }) {
    return this.chat.log(
      body?.sessionId ?? '',
      body?.role ?? 'user',
      body?.content ?? '',
    );
  }

  @Post('chat/answer')
  @HttpCode(200)
  answer(@Body() body: { sessionId?: string; message?: string }) {
    return this.chat.answer(body?.sessionId ?? '', body?.message ?? '');
  }

  @UseGuards(JwtAuthGuard)
  @Get('chat/stats')
  stats() {
    return this.chat.stats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('chat/export')
  async export(@Query('format') format: string, @Res() res: Response) {
    const useJson = format === 'json';
    const payload = await this.chat.export(useJson ? 'json' : 'csv');
    const date = new Date().toISOString().slice(0, 10);

    res.setHeader(
      'Content-Type',
      useJson ? 'application/json; charset=utf-8' : 'text/csv; charset=utf-8',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="riviu-chat-${date}.${useJson ? 'json' : 'csv'}"`,
    );
    res.send(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('chat/sessions')
  sessions() {
    return this.chat.sessions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('chat/sessions/:id')
  async session(@Param('id') id: string) {
    const session = await this.chat.session(id);
    if (!session) {
      throw new NotFoundException();
    }
    return session;
  }
}
