import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [HttpModule],
})
export class GameModule {}
