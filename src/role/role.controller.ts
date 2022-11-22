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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiHeader({ name: 'token', required: true })
@ApiTags('角色模块')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: '创建角色' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<any> {
    const { code } = createRoleDto;
    const existRole = await this.roleService.findOneByCode(code);
    if (existRole) {
      throw new HttpException('角色code已存在', HttpStatus.BAD_REQUEST);
    }
    return this.roleService.create(createRoleDto);
  }

  @Get('/list')
  @ApiOperation({ summary: '查询角色列表' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':code')
  @ApiOperation({ summary: '根据角色code查询角色' })
  findOneByCode(@Param('code') code: string) {
    return this.roleService.findOneByCode(code);
  }

  @Post('update')
  @ApiOperation({ summary: '修改角色信息' })
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @Delete(':code')
  @ApiOperation({ summary: '删除角色信息' })
  remove(@Param('code') code: string) {
    return this.roleService.remove(code);
  }
}
