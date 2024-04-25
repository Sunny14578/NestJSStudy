import { TypeOrmModuleOptions } from '@Nestjs/typeorm';

export const typeOrmConfigAsync: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'db', 
    port: 5432,
    username: 'nestUser',
    password: 'nestPassword',
    database: 'nestjsDB',
    autoLoadEntities: true,
    synchronize: true, 
  };