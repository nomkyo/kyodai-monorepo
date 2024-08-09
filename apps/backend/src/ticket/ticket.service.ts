import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTicketInput } from './dto/create-ticket.input';
import { Ticket } from '@prisma/client';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TicketService.name);
  createTicket(createTicketInput: CreateTicketInput): Promise<Ticket> {
    this.logger.log('Create ticket');
    return this.prisma.ticket.create({
      data: {
        ...createTicketInput,
        isOpen: true,
      },
    });
  }
}
