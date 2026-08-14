import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactService } from './contact.service';

@Controller()
export class ContactController {
  constructor(private readonly contact: ContactService) {}

  @Post('contact')
  create(
    @Body()
    body: {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    },
  ) {
    return this.contact.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('contact/leads')
  leads() {
    return this.contact.leads();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/inbox')
  inbox(
    @Query('since') since?: string,
    @Query('sinceLeads') sinceLeads?: string,
    @Query('sinceChats') sinceChats?: string,
  ) {
    return this.contact.inbox(since, sinceLeads, sinceChats);
  }
}
