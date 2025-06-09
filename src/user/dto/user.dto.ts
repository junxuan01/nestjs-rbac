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

// 响应DTO
export class UserDataDto {
  @ApiProperty({ description: '用户ID', example: '1' })
  id: string;

  @ApiProperty({ description: '用户名', example: 'admin' })
  name: string;

  @ApiProperty({ description: '邮箱', example: 'admin@example.com' })
  mail: string;
}

export class UserListDataDto {
  @ApiProperty({ description: '用户列表', type: [UserDataDto] })
  users: UserDataDto[];

  @ApiProperty({ description: '总数', example: 100 })
  total?: number;
}

export class PageMetaDto {
  @ApiProperty({ description: '总条数', example: 100 })
  totalItems: number;

  @ApiProperty({ description: '每页条数', example: 10 })
  itemsPerPage: number;

  @ApiProperty({ description: '总页数', example: 10 })
  totalPages: number;

  @ApiProperty({ description: '当前页', example: 1 })
  currentPage: number;
}

export class UserPageDataDto {
  @ApiProperty({ description: '用户列表', type: [UserDataDto] })
  items: UserDataDto[];

  @ApiProperty({ description: '分页信息', type: PageMetaDto })
  meta: PageMetaDto;
}

export class CreateUserDataDto {
  @ApiProperty({ description: '创建成功的用户ID', example: '1' })
  id: string;
}

export class SetRolesDataDto {
  @ApiProperty({ description: '设置结果', example: 'success' })
  result: string;
}
