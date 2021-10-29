/* eslint-disable prettier/prettier */
import { DynamicModule, Injectable, Module } from '@nestjs/common';
import {
  SequelizeModuleOptions,
  SequelizeModule,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize/types';
import { SequelizeOptions } from 'sequelize-typescript';
import { account } from 'models/public';
// const databaseProvider = [
//   {
//     provide: 'SEQUELIZE',
//     useFactory: async () => {
//       const sequelize = new Sequelize({
//         dialect: 'postgres',
//         host: 'localhost',
//         port: 3306,
//         username: 'root',
//         password: 'password',
//         database: 'nest',
//         replication:
//       });
//       sequelize.addModels([Cat]);
//       await sequelize.sync();
//       return sequelize;
//     },
//   },
// ]
@Injectable()
class DBConfigService implements SequelizeOptionsFactory {
  dialect: Dialect = 'postgres'
  config = {
    dialect: this.dialect,
    logging: true,
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'myviewboard-test',
    autoLoadModels: true
  };
  constructor(private readonly configService: ConfigService) {
    this.config = Object.assign(this.config, configService.get('database'))
    this.config.dialect = 'postgres'
    // this.config.autoLoadModels = true
  }
  createSequelizeOptions(): SequelizeModuleOptions {
    console.log(this.config)
    return this.config
  }
}

@Module({
  providers: [ConfigModule, DBConfigService],
  exports: [DBConfigService],
})
class ConfigModule { }

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: DBConfigService,
      
    }),
  ],
})
export class DatabaseModule {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static forFeature(entities?: Function[], connection?: SequelizeOptions | string): DynamicModule {
    return SequelizeModule.forFeature(entities, connection);
  }
}
