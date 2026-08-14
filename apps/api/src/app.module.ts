import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AiModule } from './ai/ai.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ContentModule } from './content/content.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { MediaModule } from './media/media.module';
import { PrismaModule } from './prisma.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ContentModule,
    TrackModule,
    AnalyticsModule,
    ChatModule,
    MediaModule,
    KnowledgeModule,
    AiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
