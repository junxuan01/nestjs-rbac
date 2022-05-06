import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: '张三', required: true })
  @IsNotEmpty({ message: '用户名必填' })
  username: string;

  @ApiProperty({ description: '密码', example: '12345', required: true })
  @IsNotEmpty({ message: '密码必填' })
  password: string;
}
