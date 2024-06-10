import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Schedule } from './models/schedule.model';
import { League } from './models/league.model';
import { ConfigService } from '@nestjs/config';
import { OddsLeagueResponse, OddsResponse } from './dto/odds-api.responses';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ScheduleService {
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
  private readonly logger = new Logger(ScheduleService.name);

  async getScheduleForSport(league: string): Promise<Schedule[]> {
    try {
      const response = await this.httpService.axiosRef.get<OddsResponse[]>(
        this.scheduleUrl(league),
        {
          params: {
            apiKey: this.configService.get('ODDS_API_KEY'),
            regions: 'us',
            markets: 'spreads',
          },
          headers: this.header,
        },
      );

      return response.data.map((odd) => {
        const homeTeam = odd.home_team;
        const awayTeam = odd.away_team;
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
          homeTeam,
          awayTeam,
          startTime,
          homeSpread,
          awaySpread,
          id,
        };
      });
    } catch (e) {
      this.logger.error(e);
      return [];
    }
  }

  async getLeagues(): Promise<League[]> {
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
  @Cron(CronExpression.EVERY_DAY_AT_5AM, { name: "updateOdds" })
  async updateOdds() {
    const schedule = await this.getScheduleForSport("americanfootball_nfl")
    for (const game of schedule) {
      await this.prisma.game.upsert({
        where: {
          id: game.id,
        },
        update: game,
        create: game,
      })
    }

  }
}
