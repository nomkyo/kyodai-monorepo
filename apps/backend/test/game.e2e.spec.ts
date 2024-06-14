import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import nock from 'nock';
import { GameService } from '../src/game/game.service';
import { Game, Team } from '@prisma/client';
import nflTeams from '../src/common/data/nfl-team.json';
import { loadDb } from 'prisma/load-db';
import { newOddsResponse } from './fixtures/odds-api-responses';
import { ID } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';

describe('GameController (e2e)', () => {
  let app: INestApplication;
  let gameService: GameService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    gameService = app.get<GameService>(GameService);

    await app.init();
  });

  it('gameService.getLeagues, returns leagues from Odds API', async () => {
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
    const { games } = await loadDb();
    const gamesResponse = games.map((g) => ({
      ...g,
      startTime: g.startTime.toISOString(),
      createdAt: g.createdAt.toISOString(),
      updatedAt: g.updatedAt.toISOString(),
    }));

    // Act
    await request(app.getHttpServer())
      .get(`/schedule`)
      .query({ league })
      .expect(200)
      .expect(gamesResponse);
  });
  it('GameService.updateOdds cron. it updates and creates games from odds API', async () => {
    const { teams, games } = await loadDb();
    const firstGameHomeTeam = teams.filter(
      (t) => games[0].homeTeamId === t.id,
    )[0];
    const firstGameAwayTeam = teams.filter(
      (t) => games[0].awayTeamId === t.id,
    )[0];
    const league = 'americanfootball_nfl';

    const newFirstGameHomeSpread = games[0].homeSpread + 1;
    const newFirstGameAwaySpread = games[0].awaySpread + 1;
    const id = 'skjthdk';
    const firstGameOddsResponse = {
      id: games[0].id,
      commence_time: games[0].startTime.toISOString(),
      home_team: firstGameHomeTeam.fullName,
      away_team: firstGameAwayTeam.fullName,
      bookmakers: [
        {
          markets: [
            {
              outcomes: [
                {
                  point: newFirstGameHomeSpread,
                },
                {
                  point: newFirstGameAwaySpread,
                },
              ],
            },
          ],
        },
      ],
    };
    const newGameOddsResponse = {
      id: id,
      commence_time: '2023-10-11T23:10:00Z',
      home_team: firstGameHomeTeam.fullName,
      away_team: firstGameAwayTeam.fullName,
      bookmakers: [
        {
          markets: [
            {
              outcomes: [
                {
                  point: 2.5,
                },
                {
                  point: -2.5,
                },
              ],
            },
          ],
        },
      ],
    };
    const response = [
      {
        ...newOddsResponse(),
        ...firstGameOddsResponse,
      },
      {
        ...newOddsResponse(),
        ...newGameOddsResponse,
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
    //  Act
    await gameService.updateOdds();

    // Assert
    const actualFirstGame = await prisma.game.findFirst({
      where: { id: game[0].id },
    });
    const actualNewGame = await prisma.game.findFirst({ where: { id } });
    expect(actualFirstGame.homeSpread).toEqual(newFirstGameHomeSpread);
    expect(actualFirstGame.awaySpread).toEqual(newFirstGameAwaySpread);
    expect(actualNewGame).not.toBeNull();
    scope.done();
  });

  describe('seedDb', () => {
    it('does nothing if NODE_ENV != prod', async () => {
      const mockPrismaService = app.get<PrismaService>(PrismaService);
      mockPrismaService.team.findAll = jest.fn()
      gameService.updateOdds = jest.fn();

      // Act
      await gameService.seedDb();

      // Assert
      expect(gameService.updateOdds).not.toHaveBeenCalled()
      expect(mockPrismaService.team.findAll).not.toHaveBeenCalled()
    });
    it('seedDb. if there are no ', async () => {
      prisma.team.upsert = jest.fn();
      // Act
      await gameService.seedDb();

      // Assert
      for (const team of nflTeams) {
        expect(prisma.team.upsert).toHaveBeenCalledWith({
          where: { code: team.code },
          create: team,
          update: team,
        });
      }
    });
  });
});
