import { Controller, Get, Logger, Query, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { GetScheduleInput } from './dto/get-schedule.input';
import { League } from './models/league.model';

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
  ) {
    this.logger.debug('Get Schedule');
    return await this.scheduleService.getScheduleForSport(
      getScheduleInput.league,
    );
  }

  @Get('leagues')
  async getLeagues(): Promise<League[]> {
    this.logger.debug('Get Leagues');

    return await this.scheduleService.getLeagues();
  }
}
