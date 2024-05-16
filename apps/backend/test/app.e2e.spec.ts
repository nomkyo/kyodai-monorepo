import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import nock from 'nock';
import 'dotenv/config';
import { Schedule } from '../src/schedule/models/schedule.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/leagues returns the leagues', async () => {
    const expectedResponse = [
      {
        key: 'americanfootball_nfl',
        active: true,
        group: 'American Football',
        description: 'US Football',
        title: 'NFL',
      },
    ];
    const scope = nock(process.env.ODDS_BASE_URL)
      .get('/sports')
      .query({ apiKey: process.env.ODDS_API_KEY, all: true })
      .reply(200, expectedResponse);
    await request(app.getHttpServer())
      .get(`/leagues`)
      .expect(200)
      .expect(expectedResponse);

    scope.done();
  });
  it('/schedule returns the schedules', async () => {
    const league = 'baseball_mlb';
    const gameStartTime = '2023-10-11T23:10:00Z';
    const homeTeam = 'Houston Texans';
    const awayTeam = 'Kansas City Chiefs';
    const homeSpread = 2.5;
    const awaySpread = -2.5;
    const id = 'skjthdk';
    const expectedSchedules: Schedule[] = [
      {
        homeTeam,
        awayTeam,
        startTime: gameStartTime,
        homeSpread,
        awaySpread,
        id,
      },
    ];
    const response = [
      {
        id,
        sport_key: 'americanfootball_nfl',
        sport_title: 'NFL',
        commence_time: gameStartTime,
        home_team: homeTeam,
        away_team: awayTeam,
        bookmakers: [
          {
            key: 'draftkings',
            title: 'DraftKings',
            last_update: '2023-10-10T12:10:29Z',
            markets: [
              {
                key: 'spread',
                last_update: '2023-10-10T12:10:29Z',
                outcomes: [
                  {
                    name: 'Houston Texans',
                    price: 2.23,
                    point: homeSpread,
                  },
                  {
                    name: 'Kansas City Chiefs',
                    price: 1.45,
                    point: awaySpread,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const scope = nock(process.env.ODDS_BASE_URL)
      .get(`/sports/${league}/odds`)
      .query({
        apiKey: process.env.ODDS_API_KEY,
        regions: 'us',
        markets: 'spreads',
      })
      .reply(200, response);

    await request(app.getHttpServer())
      .get(`/schedule`)
      .query({ league })
      .expect(200)
      .expect(expectedSchedules);

    scope.done();
  });
});
