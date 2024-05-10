import { IsNotEmpty } from 'class-validator';

export class GetScheduleInput {
  @IsNotEmpty()
  league: string;
}
