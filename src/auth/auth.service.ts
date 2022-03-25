import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (!compareSync(user.password, password)) {
      throw new BadRequestException('密码错误！');
    }
    return user;
  }
}
