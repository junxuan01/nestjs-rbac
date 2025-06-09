import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ description: '角色ID', example: 1, required: true })
  id: number;
}
