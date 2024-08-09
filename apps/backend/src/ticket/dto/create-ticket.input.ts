import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTicketInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creatorId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  matchId: string;
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  homeSpread: number;
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  awaySpread: number;
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty()
  amount: number;
}
