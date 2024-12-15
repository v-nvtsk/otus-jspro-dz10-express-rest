import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Users, UserTokens, Roles, Comments, Tasks } from './entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Users, UserTokens, Roles, Comments, Tasks],
  subscribers: [],
  migrations: [process.env.TYPEORM_MIGRATIONS || 'dist/migrations/*.js'],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));
