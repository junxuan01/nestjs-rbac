import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/api-response.dto';

/**
 * 自定义装饰器，用于统一的API响应格式
 * @param dataDto 业务数据的DTO类型
 * @param description 响应描述
 */
export const ApiSuccessResponse = <T extends Type<any>>(
  dataDto: T,
  description = '请求成功',
) => {
  return applyDecorators(
    ApiExtraModels(dataDto, ApiResponseDto), // 确保两个都注册到 schemas
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  );
};
