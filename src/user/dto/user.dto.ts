import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'test_user', required: true })
  @IsNotEmpty({ message: '用户名必填' })
  name: string;

  @ApiProperty({ description: '密码', example: '1q1q1q', required: true })
  @IsNotEmpty({ message: '密码必填' })
  password: string;

  @ApiProperty({ description: '角色Ids', example: '[1,2,3]', required: false })
  rolesId: number[];
}

export class SetRolesDto {
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '用户ID' })
  userId: string;

  @IsNotEmpty()
  @ApiProperty({ example: [1], description: '角色ID' })
  roleIds: number[];
}

export class SearchUserDto {
  @ApiProperty({ required: false, example: 1, description: '用户ID' })
  userId: string;

  @ApiProperty({ required: false, example: '张三', description: '用户名' })
  name: string;

  @ApiProperty({ required: true, example: 1, description: '当前页数' })
  page?: number;
  @ApiProperty({ required: true, example: 10, description: '当前条数' })
  pageSize?: number;
}
