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
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':code')
  findOneByCode(@Param('code') code: string) {
    return this.roleService.findOneByCode(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(code, updateRoleDto);
  }

  @Delete(':code')
  remove(@Param('code') code: string) {
    return this.roleService.remove(code);
  }
}
