import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetScheduleInput {
  @ApiProperty()
  @IsNotEmpty()
  league: string;
}
