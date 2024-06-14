import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import nock from 'nock';
import { GameService } from '../src/game/game.service';
import nflTeams from '../src/common/data/nfl-team.json';
import { loadDb } from '../prisma/load-db';
import { newOddsResponse } from './fixtures/odds-api-responses';
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
    const response = await request(app.getHttpServer())
      .get(`/schedule`)
      .query({ league })
      .expect(200);
    // Assert
    const responseBody = JSON.parse(response.text);
    for (const b of responseBody) {
      delete b['awayTeam'];
      delete b['homeTeam'];
    }
    expect(responseBody).toEqual(gamesResponse);
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

    const expectedFirstGameHomeSpread = games[0].homeSpread + 1;
    const expectedFirstGameAwaySpread = games[0].awaySpread + 1;
    const newGameHomeSpread = 3;
    const newGameAwaySpread = -3;
    const newGameHomeTeam = teams[0].fullName;
    const newGameAwayTeam = teams[1].fullName;

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
                  point: expectedFirstGameHomeSpread,
                },
                {
                  point: expectedFirstGameAwaySpread,
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
      home_team: newGameHomeTeam,
      away_team: newGameAwayTeam,
      bookmakers: [
        {
          markets: [
            {
              outcomes: [
                {
                  point: newGameHomeSpread,
                },
                {
                  point: newGameAwaySpread,
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
    const prisma = app.get<PrismaService>(PrismaService);

    const actualFirstGame = await prisma.game.findFirst({
      where: { id: games[0].id },
    });
    const actualNewGame = await prisma.game.findFirst({
      where: { id },
      include: { awayTeam: true, homeTeam: true },
    });
    expect(actualFirstGame.homeSpread).toEqual(expectedFirstGameHomeSpread);
    expect(actualFirstGame.awaySpread).toEqual(expectedFirstGameAwaySpread);
    expect(actualNewGame.homeTeam.fullName).toEqual(newGameHomeTeam);
    expect(actualNewGame.awayTeam.fullName).toEqual(newGameAwayTeam);
    expect(actualNewGame.homeSpread).toEqual(newGameHomeSpread);
    expect(actualNewGame.awaySpread).toEqual(newGameAwaySpread);
    scope.done();
  });

  describe('seedDb', () => {
    it('does not call DB if NODE_ENV=prod', async () => {
      await loadDb();
      const prisma = app.get<PrismaService>(PrismaService);
      prisma.team.count = jest.fn();
      prisma.game.count = jest.fn();
      process.env.NODE_ENV = 'prod';

      // Act
      await gameService.seedDb();

      // Assert
      expect(prisma.game.count).not.toHaveBeenCalled();
      expect(prisma.team.count).not.toHaveBeenCalled();
    });    
    it('does not upsert teams or updateOdds if there are teams and games', async () => {
      await loadDb();
      const prisma = app.get<PrismaService>(PrismaService);
      prisma.team.upsert = jest.fn();
      gameService.updateOdds = jest.fn();

      // Act
      await gameService.seedDb();

      // Assert
      expect(gameService.updateOdds).not.toHaveBeenCalled();
      expect(prisma.team.upsert).not.toHaveBeenCalled();
    });
    it('creates teams and updatesOdds if there are no team or games', async () => {
      await loadDb();
      gameService.updateOdds = jest.fn();

      const prisma = app.get<PrismaService>(PrismaService);
      await prisma.game.deleteMany();
      await prisma.team.deleteMany();

      // Act
      await gameService.seedDb();

      // Assert
      const actualTeams = await prisma.team.findMany();
      expect(gameService.updateOdds).toHaveBeenCalled();
      expect(actualTeams.length).toEqual(nflTeams.length);
    });
  });
});
