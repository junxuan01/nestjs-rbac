import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, FindManyOptions } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

import { User } from './entities/user.entity';
import { CreateUserDto, SearchUserDto } from './dto/user.dto';
import { LoggerService } from '@/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly logger: LoggerService,
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
  findAllByPage(searchParams: SearchUserDto) {
    this.logger.info('正在分页查询所有用户');
    const { page, pageSize } = searchParams;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (searchParams.userId) {
      queryBuilder.andWhere('user.userId = :userId', {
        userId: searchParams.userId,
      });
    }
    if (searchParams.name) {
      queryBuilder.andWhere('user.name LIKE :name', {
        name: `%${searchParams.name}%`,
      });
    }
    return paginate<User>(queryBuilder, { page, limit: pageSize });
  }

  findAll(searchParams): Promise<User[]> {
    this.logger.info('正在查询所有用户');
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
