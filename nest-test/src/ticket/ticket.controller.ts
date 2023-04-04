import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  HttpException,
  Header,
  Param,
  Body,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AddTicketDto } from './dto/add-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { TicketService } from './ticket.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('ticket')
@UseFilters(HttpExceptionFilter)
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
  }

  @Get()
  getAll(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    console.log(response);
    response
      .json(this.ticketService.getAll())
      .status(HttpStatus.OK)
      .send('get all');
  }

  @Post()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  add(@Body() ticketDto: AddTicketDto) {
    this.ticketService.add(ticketDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() ticketDto: UpdateTicketDto) {
    console.log(id);
    console.log(ticketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log(id);
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
