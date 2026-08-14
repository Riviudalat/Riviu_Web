import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly content: ContentService) {}

  @Get(':slug')
  async get(@Param('slug') slug: string) {
    const page = await this.content.get(slug);
    if (!page) {
      throw new NotFoundException('Chưa có nội dung cho trang này');
    }
    return page;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  save(@Param('slug') slug: string, @Body() body: { data?: unknown }) {
    return this.content.save(slug, body?.data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':slug/revisions')
  revisions(@Param('slug') slug: string) {
    return this.content.revisions(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slug/restore/:revisionId')
  @HttpCode(200)
  restore(
    @Param('slug') slug: string,
    @Param('revisionId') revisionId: string,
  ) {
    return this.content.restore(slug, revisionId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  reset(@Param('slug') slug: string) {
    return this.content.reset(slug);
  }
}
