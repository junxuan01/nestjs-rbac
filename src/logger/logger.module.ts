import { Module, Global } from '@nestjs/common';
import * as log4js from 'log4js';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [
    {
      provide: LoggerService,
      useFactory: () => {
        log4js.configure({
          appenders: {
            console: { type: 'console' },
          },
          categories: {
            default: { appenders: ['console'], level: 'info' },
          },
        });
        return new LoggerService(log4js.getLogger());
      },
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
