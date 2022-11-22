import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'test_user', required: true })
  @IsNotEmpty({ message: '用户名必填' })
  name: string;

  @ApiProperty({ description: '密码', example: '1q1q1q', required: true })
  @IsNotEmpty({ message: '密码必填' })
  password: string;
}
export class SetRolesDto {
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '用户ID' })
  userId: number;

  @IsNotEmpty()
  @ApiProperty({ example: [1], description: '角色ID' })
  roleIds: number[];
}
