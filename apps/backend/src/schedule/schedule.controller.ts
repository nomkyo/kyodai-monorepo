import { Controller, Get, Logger, Query, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { GetScheduleInput } from './dto/get-schedule.input';
import { League } from './models/league.model';
import { Game } from '@prisma/client';

@Controller()
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}
  private readonly logger = new Logger(ScheduleController.name);

  @Get('schedule')
  async getScheduleForSport(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    getScheduleInput: GetScheduleInput,
  ): Promise<Game[]> {
    this.logger.log('Get Schedule');
    return await this.scheduleService.getSchedule(getScheduleInput.league);
  }

  @Get('leagues')
  async getLeagues(): Promise<League[]> {
    this.logger.log('Get Leagues');

    return [
      {
        key: 'americanfootball_nfl',
        group: 'American Football',
        title: 'NFL',
        description: 'US Football',
        active: true,
      },
    ];
  }
}
