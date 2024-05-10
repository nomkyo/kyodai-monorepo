import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { HttpModule } from '@nestjs/axios';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [ScheduleController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ScheduleService,
  ],
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: Number(process.env.NESTJS_CACHE_TTL),
      max: 100,
    }),
  ],
})
export class ScheduleModule {}
