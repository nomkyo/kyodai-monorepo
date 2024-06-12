import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { League } from './models/league.model';
import { ConfigService } from '@nestjs/config';
import { OddsLeagueResponse, OddsResponse } from './dto/odds-api.responses';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'nestjs-prisma';
import { Game } from '@prisma/client';
import nflTeams from '../common/data/nfl-team.json';

@Injectable()
export class GameService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}
  private readonly header = { Accept: 'application/json' };
  private readonly leaguesUrl = () =>
    `${this.configService.get('ODDS_BASE_URL')}/sports`;
  private readonly scheduleUrl = (league: string) =>
    `${this.configService.get('ODDS_BASE_URL')}/sports/${league}/odds`;
  private readonly logger = new Logger(GameService.name);

  async getLeagues(): Promise<League[]> {
    this.logger.log(`Getting leagues from ${this.leaguesUrl()}`);
    const response = await this.httpService.axiosRef.get<OddsLeagueResponse[]>(
      this.leaguesUrl(),
      {
        params: { apiKey: this.configService.get('ODDS_API_KEY'), all: true },
        headers: this.header,
      },
    );
    return response.data
      .map((league) => ({
        key: league.key,
        group: league.group,
        title: league.title,
        description: league.description,
        active: league.active,
      }))
      .filter((league) => {
        return league.active;
      });
  }

  getGames(league: string): Promise<Game[]> {
    this.logger.log(`Getting game from DB where league=${league}`);
    return this.prisma.game.findMany({
      where: {
        league: league,
      },
      include: { homeTeam: true, awayTeam: true },
    });
  }
  getGame(id: string): Promise<Game> {
    this.logger.log(`Getting game from DB where id=${id}`);
    return this.prisma.game.findFirst({
      where: {
        id: id,
      },
      include: { homeTeam: true, awayTeam: true },
    });
  }
  @Cron(CronExpression.EVERY_DAY_AT_5AM, { name: 'updateOdds' })
  async updateOdds() {
    const teams = [];
    for (const team of nflTeams) {
      const dbTeam = await this.prisma.team.upsert({
        where: { code: team.code },
        create: team,
        update: team,
      });
      teams.push(dbTeam);
    }

    const league = 'americanfootball_nfl';
    const url = this.scheduleUrl(league);
    this.logger.log(`Getting odds from ${url}`);
    const response = await this.httpService.axiosRef.get<OddsResponse[]>(url, {
      params: {
        apiKey: this.configService.get('ODDS_API_KEY'),
        regions: 'us',
        markets: 'spreads',
      },
      headers: this.header,
    });

    const games = response.data.map((odd) => {
      const homeTeam = teams.filter((team) => team.fullName === odd.home_team);
      const awayTeam = teams.filter((team) => team.fullName === odd.away_team);
      const startTime = odd.commence_time;
      const id = odd.id;

      let homeSpread, awaySpread;
      for (const b of odd.bookmakers) {
        for (const m of b.markets) {
          homeSpread = m.outcomes[0].point;
          awaySpread = m.outcomes[1].point;
        }
      }
      return {
        homeTeamId: homeTeam[0].id,
        awayTeamId: awayTeam[0].id,
        startTime,
        homeSpread,
        awaySpread,
        id,
        league,
      };
    });
    for (const game of games) {
      await this.prisma.game.upsert({
        where: {
          id: game.id,
        },
        update: game,
        create: game,
      });
    }
  }
}
