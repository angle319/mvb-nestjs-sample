import { Module } from '@nestjs/common';
import { ConfigModule as OriginConfigModule } from '@nestjs/config';

const replication = process.env.DB_REPLICA || process.env.DB_HOST;
const configuration = () => {
  const cfg = {
    // port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      database: process.env.DB_NAME || 'myviewboard-test',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
    },
  };
  if (replication) {
    cfg.database['replication'] = {
      read: replication.split(',').map((host) => ({
        host: host,
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
      })),
      write: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
      },
    };
  }
  return cfg;
};
const setting = OriginConfigModule.forRoot({
  load: [configuration],
  isGlobal: true,
});

@Module({
  imports: [setting],
  exports: [setting],
  // controllers: [MvbAppApiController],
  // providers: [MvbAppApiService],
})
export class ConfigModule {}
