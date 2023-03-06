import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserRoleModule } from '@/user-role/user-role.module';
import { UserRoleService } from '@/user-role/user-role.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), UserRoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
