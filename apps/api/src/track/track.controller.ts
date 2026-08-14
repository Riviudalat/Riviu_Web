import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import type { Request } from 'express';
import {
  DurationDto,
  SectionsDto,
  TrackService,
  ViewDto,
} from './track.service';

/** sendBeacon gửi body dạng text/plain — parse JSON thủ công. */
function parseBody<T>(body: unknown): T {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as T;
    } catch {
      return {} as T;
    }
  }
  return (body ?? {}) as T;
}

function getIp(req: Request): string {
  return req.ip ?? req.socket?.remoteAddress ?? '';
}

@Controller('track')
export class TrackController {
  constructor(private readonly track: TrackService) {}

  @Post('view')
  @HttpCode(200)
  view(@Body() body: unknown, @Req() req: Request) {
    return this.track.view(
      parseBody<ViewDto>(body),
      req.headers['user-agent'] ?? '',
      getIp(req),
    );
  }

  @Post('duration')
  @HttpCode(200)
  duration(@Body() body: unknown) {
    return this.track.duration(parseBody<DurationDto>(body));
  }

  @Post('sections')
  @HttpCode(200)
  sections(@Body() body: unknown) {
    return this.track.sections(parseBody<SectionsDto>(body));
  }
}
