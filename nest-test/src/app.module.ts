import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TicketModule } from './ticket/ticket.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TicketModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'ticket', method: RequestMethod.DELETE })
      .forRoutes('ticket', { path: '', method: RequestMethod.GET });
  }
}
