import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleDto,
  RoleDataDto,
  RoleListDataDto,
  CreateRoleDataDto,
  UpdateRoleDataDto,
  DeleteRoleDataDto,
} from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from '@/common/decorators/api-response.decorator';

@ApiHeader({ name: 'token', required: true })
@ApiTags('roleCenter')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '创建角色', operationId: 'createRole' })
  @ApiSuccessResponse(CreateRoleDataDto, '创建角色成功')
  async create(@Body() createRoleDto: CreateRoleDto): Promise<any> {
    const { code } = createRoleDto;
    const existRole = await this.roleService.findOneByCode(code);
    if (existRole) {
      throw new HttpException('角色code已存在', HttpStatus.BAD_REQUEST);
    }
    return this.roleService.create(createRoleDto);
  }

  @Get('/list')
  @ApiOperation({ summary: '查询角色列表', operationId: 'getRoleList' })
  @ApiSuccessResponse(RoleListDataDto, '查询角色列表成功')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':code')
  @ApiOperation({
    summary: '根据角色code查询角色',
    operationId: 'getRoleByCode',
  })
  @ApiSuccessResponse(RoleDataDto, '查询角色成功')
  findOneByCode(@Param('code') code: string) {
    return this.roleService.findOneByCode(code);
  }

  @Post('update')
  @ApiOperation({ summary: '修改角色信息', operationId: 'updateRole' })
  @ApiSuccessResponse(UpdateRoleDataDto, '修改角色成功')
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @Delete(':code')
  @ApiOperation({ summary: '删除角色信息', operationId: 'removeRole' })
  @ApiSuccessResponse(DeleteRoleDataDto, '删除角色成功')
  remove(@Param('code') code: string) {
    return this.roleService.remove(code);
  }
}
