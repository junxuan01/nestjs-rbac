import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
// import mysqlConfig from './../config/mysql';
// import { AuroraMysqlConnectionOptions } from 'typeorm/driver/aurora-mysql/AuroraMysqlConnectionOptions';

import { getConfig } from '@/utils';
import { UserRoleModule } from './user-role/user-role.module';
import { LoggerModule } from './logger/logger.module';

console.log('mysql配置', getConfig('mysql'));

@Module({
  imports: [
    TypeOrmModule.forRoot(getConfig('mysql')),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig],
    }),
    UsersModule,
    AuthModule,
    RoleModule,
    UserRoleModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
}
