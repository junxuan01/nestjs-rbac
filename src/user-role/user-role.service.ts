import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  listByUserId(userId: string) {
    return this.userRoleRepository.find({
      where: {
        userId,
      },
    });
  }

  deleteByUserId(userId: string) {
    return this.userRoleRepository.delete({
      userId,
    });
  }

  async setUserRoles(userId: string, roleIds: number[]) {
    const userRoles: UserRole[] = roleIds.map((roleId) => {
      return {
        userId,
        roleId,
      };
    });
    await this.deleteByUserId(userId);
    return await this.userRoleRepository.save(userRoles);
  }
}
