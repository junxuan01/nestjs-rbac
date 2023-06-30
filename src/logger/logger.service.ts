import { Injectable } from '@nestjs/common';
import * as log4js from 'log4js';

@Injectable()
export class LoggerService {
  private logger: log4js.Logger;

  constructor(logger: log4js.Logger) {
    this.logger = logger;
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(message, trace);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
