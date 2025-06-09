import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: 'admin', required: true })
  @IsNotEmpty({ message: '用户名必填' })
  username: string;

  @ApiProperty({ description: '密码', example: '1q1q1q', required: true })
  @IsNotEmpty({ message: '密码必填' })
  password: string;
}

export class LoginDataDto {
  @ApiProperty({
    description: 'JWT访问令牌',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;
}
