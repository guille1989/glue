import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  /*
  Set openapi configuration
  */
  const config = new DocumentBuilder()
    .setTitle('Test Glue WebScraping API')
    .setDescription('Test Glue API')
    .setVersion('1.0')
    .addTag('Glue apis')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
