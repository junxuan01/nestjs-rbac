import {
  // BadRequestException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { compareSync } from 'bcryptjs';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string): Promise<any> {
    const user = await this.userService.findOneByName(username);
    if (user && compareSync(pwd, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      return null;
    }
    // if (!user) {
    //   throw new UnauthorizedException('用户名不正确！');
    // }
    // if (!compareSync(pwd, user.password)) {
    //   throw new UnauthorizedException('密码错误！');
    // }
    // const { password, ...result } = user;
    // return result;
  }
  async login(user: User) {
    const { id, name } = user;
    return {
      token: this.jwtService.sign({ username: name, id: id }),
    };
  }
}
