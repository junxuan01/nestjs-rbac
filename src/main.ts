import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExecptionFilter } from './filters/http-execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置请求前缀
  app.setGlobalPrefix('/api');
  /**
   * swagger-ui 配置
   */
  const options = new DocumentBuilder()
    .setTitle('API Factory')
    .setDescription('API Factory with nest.js')
    .setVersion('1.0')
    .addTag('api-factory')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  /**
   * 全局拦截器
   */
  app.useGlobalInterceptors(new TransformInterceptor());
  /**
   * 全局过滤器
   */
  app.useGlobalFilters(new HttpExecptionFilter());
  /**
   * 管道校验
   */
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
