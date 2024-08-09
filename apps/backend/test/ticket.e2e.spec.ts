import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TestingModule, Test } from '@nestjs/testing';
import { loadDb } from '../prisma/load-db';
import _ from 'lodash';

describe('GameController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });
  it('POST /tickets creates and returns ticket', async () => {
    const { users, games } = await loadDb();

    const body = {
      creatorId: users[0].id,
      matchId: games[0].id,
      homeSpread: 4,
      awaySpread: -4,
      amount: 100,
    };
    // Act
    const response = await request(app.getHttpServer())
      .post('/tickets')
      .send(body)
      .expect(201);
    //Assert
    const responseBody = JSON.parse(response.text);
    expect(body).toEqual(_.pick(responseBody, Object.keys(body)));
  });
});
