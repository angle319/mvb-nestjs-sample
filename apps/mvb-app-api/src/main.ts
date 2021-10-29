import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MvbAppApiModule } from './mvb-app-api.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MvbAppApiModule,
    new FastifyAdapter(),
  );
  const config = new DocumentBuilder()
    .setTitle('Application API')
    .setDescription('For whiteboard client API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
