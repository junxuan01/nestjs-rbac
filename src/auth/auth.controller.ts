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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginDataDto } from './auth.dto';
import { ApiSuccessResponse } from '../common/decorators/api-response.decorator';

@ApiTags('authCenter')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录', operationId: 'login' })
  @ApiSuccessResponse(LoginDataDto, '登录成功')
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(@Body() user: LoginDto, @Request() req): Promise<LoginDataDto> {
    return this.authService.login(req.user);
  }
}
