import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from './src/user/entities/user.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'work',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '7786051',
  entities: [User],
  synchronize: true,
};
export default config;
