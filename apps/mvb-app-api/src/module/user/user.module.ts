import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../core/database/database.module';
import { account, accountSetting } from 'models/public';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [SequelizeModule.forFeature([account, accountSetting])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
