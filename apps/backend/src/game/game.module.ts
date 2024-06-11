import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [GameController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    GameService,
  ],
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: Number(process.env.NESTJS_CACHE_TTL),
      max: 100,
    }),
  ],
})
export class GameModule {}
