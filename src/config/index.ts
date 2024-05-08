import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { dbConfig } from './database';

interface iConfig {
  env: string;
  port: number;
  database: PostgresConnectionOptions;
}

export default (): Partial<iConfig> => ({
  env: 'development',
  port: 3000,
  database: dbConfig(),
});
