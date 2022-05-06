import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  // Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() user: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }
}
