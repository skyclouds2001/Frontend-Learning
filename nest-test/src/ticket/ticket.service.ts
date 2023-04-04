import { Injectable } from '@nestjs/common';
import { Ticket } from './interfaces/ticket.interface';

@Injectable()
export class TicketService {
  private readonly tickets: Ticket[] = [];

  add(ticket: Ticket): void {
    this.tickets.push(ticket);
  }

  getAll(): Ticket[] {
    return this.tickets;
  }
}
