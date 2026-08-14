import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AiService, type AiConfigDto } from './ai.service';

@UseGuards(JwtAuthGuard)
@Controller('ai-config')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Get()
  get() {
    return this.ai.getMaskedConfig();
  }

  @Put()
  save(@Body() body: AiConfigDto) {
    return this.ai.saveConfig(body ?? {});
  }

  @Post('test')
  @HttpCode(200)
  test() {
    return this.ai.test();
  }
}
