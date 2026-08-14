import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { KnowledgeService, type KnowledgeDto } from './knowledge.service';

@UseGuards(JwtAuthGuard)
@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledge: KnowledgeService) {}

  @Get()
  list() {
    return this.knowledge.list();
  }

  @Post()
  create(@Body() body: KnowledgeDto) {
    return this.knowledge.create(body ?? {});
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: KnowledgeDto) {
    return this.knowledge.update(id, body ?? {});
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.knowledge.remove(id);
  }
}
