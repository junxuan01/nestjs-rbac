import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: '角色名名称', example: 'admin', required: true })
  @IsNotEmpty({ message: '角色名必填' })
  name: string;

  @ApiProperty({ description: '角色code', example: 'ADMIN', required: true })
  @IsNotEmpty({ message: '角色code必填' })
  code: string;

  @ApiProperty({
    description: '角色描述',
    example: '超级管理员',
    required: true,
  })
  @IsNotEmpty({ message: '角色描述必填' })
  desc: string;
}

// 响应DTO
export class RoleDataDto {
  @ApiProperty({ description: '角色ID', example: 1 })
  id: number;

  @ApiProperty({ description: '角色名称', example: 'admin' })
  name: string;

  @ApiProperty({ description: '角色code', example: 'ADMIN' })
  code: string;

  @ApiProperty({ description: '角色描述', example: '超级管理员' })
  desc: string;
}

export class RoleListDataDto {
  @ApiProperty({ description: '角色列表', type: [RoleDataDto] })
  roles: RoleDataDto[];
}

export class CreateRoleDataDto {
  @ApiProperty({ description: '创建成功的角色ID', example: 1 })
  id: number;
}

export class UpdateRoleDataDto {
  @ApiProperty({ description: '更新结果', example: 'success' })
  result: string;
}

export class DeleteRoleDataDto {
  @ApiProperty({ description: '删除结果', example: 'success' })
  result: string;
}
