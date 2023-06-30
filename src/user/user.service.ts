import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   *
   * @param createUserDto CreateUserDto
   * @description 创建/更新 user
   */
  async createOne(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  findAll(searchParams): Promise<User[]> {
    const conditions = {
      ...searchParams,
    };
    if (conditions.name || conditions.name == '') {
      conditions.name = Like(`%${conditions.name}%`);
    }
    return this.usersRepository.find({
      where: {
        ...conditions,
        // name: Like(`%${searchParams.name}%`),
        // name: searchParams.name,
      },
    });
  }

  findOneById(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
    });
  }

  findOneByName(name: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { name: name },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
