import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import nock from 'nock';
import { GameService } from '../src/game/game.service';
import { PrismaService } from 'nestjs-prisma';
import { Game } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let gameService: GameService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    gameService = app.get<GameService>(GameService);
    prisma = app.get<PrismaService>(PrismaService);

    await app.init();
  });

  it('gameService, returns leagues from Odds API', async () => {
    const activeLeague = {
      key: 'americanfootball_nfl',
      active: true,
      group: 'American Football',
      description: 'US Football',
      title: 'NFL',
    };
    const inactiveLeague = {
      key: 'football_afl',
      active: false,
      group: 'Football',
      description: 'Afl Football',
      title: 'AFL',
    };
    const expectedResponse = [activeLeague];
    const scope = nock(process.env.ODDS_BASE_URL)
      .get('/sports')
      .query({ apiKey: process.env.ODDS_API_KEY, all: true })
      .reply(200, [activeLeague, inactiveLeague]);
    // Act
    const actualLeagues = await gameService.getLeagues();
    // Assert
    expect(actualLeagues).toEqual(expectedResponse);
    scope.done();
  });
  it('/schedule returns the games from prisma', async () => {
    const league = 'americanfootball_nfl';
    const gameStartTime = new Date();
    const homeTeamId = 'Houston Texans';
    const awayTeamId = 'Kansas City Chiefs';
    const homeSpread = 2.5;
    const awaySpread = -2.5;
    const id = 'skjthdk';
    const expectedGames: Game[] = [
      {
        homeTeamId,
        awayTeamId,
        startTime: gameStartTime,
        homeSpread,
        awaySpread,
        league,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const gamesResponse = expectedGames.map((g) => ({
      ...g,
      startTime: g.startTime.toISOString(),
      createdAt: g.createdAt.toISOString(),
      updatedAt: g.updatedAt.toISOString(),
    }));

    prisma.game.findMany = jest.fn().mockResolvedValueOnce(expectedGames);
    // Act
    await request(app.getHttpServer())
      .get(`/schedule`)
      .query({ league })
      .expect(200)
      .expect(gamesResponse);
    // Assert
    expect(prisma.game.findMany).toHaveBeenCalledWith({
      where: { league },
    });
  });
  it('GameService.updateOdds cron. returns the games from Odds API', async () => {
    const league = 'americanfootball_nfl';
    const gameStartTime = '2023-10-11T23:10:00Z';
    const homeTeam = 'Houston Texans';
    const awayTeam = 'Kansas City Chiefs';
    const homeSpread = 2.5;
    const awaySpread = -2.5;
    const id = 'skjthdk';
    const expectedGame = {
      homeTeam,
      awayTeam,
      startTime: gameStartTime,
      homeSpread,
      awaySpread,
      league,
      id,
    };
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

    prisma.game.upsert = jest.fn();
    //  Act
    await gameService.updateOdds();

    // Assert
    expect(prisma.game.upsert).toHaveBeenCalledWith({
      where: {
        id: expectedGame.id,
      },
      update: expectedGame,
      create: expectedGame,
    });
    scope.done();
  });
  it('updateOdds', async () => {
    await gameService.updateOdds();
  });
});
