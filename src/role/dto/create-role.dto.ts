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
