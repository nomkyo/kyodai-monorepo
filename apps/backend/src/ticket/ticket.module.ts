import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TicketController],
  providers: [TicketService],
  imports: [HttpModule],
})
export class TicketModule {}
