import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from '@prisma/client';

@Controller()
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  private readonly logger = new Logger(TicketController.name);
  @Post('tickets')
  async createTicket(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    createTicketInput: CreateTicketInput,
  ): Promise<Ticket> {
    return await this.ticketService.createTicket(createTicketInput);
  }
}
