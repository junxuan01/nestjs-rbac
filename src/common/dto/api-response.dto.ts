import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: '状态码', example: 0 })
  status: number;

  @ApiProperty({ description: '额外信息', example: {} })
  extra: object;

  @ApiProperty({ description: '响应消息', example: 'success' })
  message: string;

  @ApiProperty({ description: '是否成功', example: true })
  success: boolean;

  @ApiProperty({ description: 'HTTP状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '业务数据' })
  data: T;
}
