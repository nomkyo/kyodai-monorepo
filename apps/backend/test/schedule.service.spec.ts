import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from 'nestjs-prisma';
import { JwtService } from '@nestjs/jwt';
import { setupApp } from '../src/common/configs/setupApp';
import { ScheduleService } from '../src/schedule/schedule.service';

describe('ScheduleService (e2e)', () => {
  let app: INestApplication;
  let scheduleService: ScheduleService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = setupApp(moduleFixture.createNestApplication());
    await app.init();
    scheduleService = app.get<ScheduleService>(ScheduleService);
  });

  afterAll(async () => {
    await app.close();
  });
  it("updateOdds", async () => {
    await scheduleService.updateOdds()
  })
});