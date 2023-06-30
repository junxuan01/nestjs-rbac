declare const module: any;

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExecptionFilter } from './common/filters/http.execption.filter';
import { AllExceptionsFilter } from './common/filters/base.exception.filter';

// import { getConfig } from '@/utils/index';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'log', 'warn'],
  });
  /**
   * @description 设置请求前缀
   */
  app.setGlobalPrefix('/apis');
  /**
   * @description swagger-ui 配置
   *
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
   * 用于过滤Http success请求, 统一返回格式
   */
  app.useGlobalInterceptors(new TransformInterceptor());
  /**
   * 全局过滤器
   * 用于过滤Http error请求, 统一返回格式
   */
  app.useGlobalFilters(new HttpExecptionFilter());
  /**
   * 管道校验
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // 添加热更新
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  app.enableCors();
  await app.listen(3000);
}

bootstrap().then((res) => {
  console.log('start success');
});
