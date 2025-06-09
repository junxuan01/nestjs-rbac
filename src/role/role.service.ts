import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(
      this.roleRepository.create(createRoleDto),
    );
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOneByCode(code: string) {
    return this.roleRepository.findOne({
      where: { code: code },
    });
  }

  async update(updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { code: updateRoleDto.code },
    });

    if (!role) {
      return null;
    }

    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  remove(code: string) {
    return `This action removes a #${code} role`;
  }
}
