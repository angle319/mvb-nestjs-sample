import { Module } from '@nestjs/common';
import { MvbAppApiController } from './mvb-app-api.controller';
import { MvbAppApiService } from './mvb-app-api.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from './shared/config.module';
import { UserModule } from './module/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
  // imports: [
  //   ConfigModule,
  //   SequelizeModule.forRootAsync({
  //     useFactory: () => ({
  //       dialect: 'postgres',
  //       host: 'localhost',
  //       username: 'postgres',
  //       password: 'postgres',
  //       database: 'myviewboard-test',
  //     }),
  //   }),
  //   UserModule,
  // ],
  controllers: [MvbAppApiController],
  providers: [MvbAppApiService],
  exports: [UserModule],
})
export class MvbAppApiModule { }
