import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MvbAppApiModule } from './mvb-app-api/src/mvb-app-api.module';
import { AppModule } from './mvb-core-api/src/app.module';
import { UserModule } from './mvb-app-api/src/module/user/user.module';

@Module({
  imports: [MvbAppApiModule, AppModule],
  controllers: [],
  providers: [],
})
class AllApiModule { }

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AllApiModule,
    new FastifyAdapter(),
  );
  const config = new DocumentBuilder()
    .setTitle('Application API')
    .setDescription('For whiteboard client API')
    .setVersion('1.0')
    .setBasePath('')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [MvbAppApiModule, UserModule],
  });
  console.log(JSON.stringify(document));
  SwaggerModule.setup('/api-docs', app, document, {
    uiConfig: {},
    //urls: [{ url: '<url1>', name: '<name1>' }],
  });
  await app.listen(3005, '0.0.0.0');
}
bootstrap();
