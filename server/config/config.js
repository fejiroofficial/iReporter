import dotenv from 'dotenv';

dotenv.config();


export default {
  development: {
    user: 'postgres',
    password: process.env.DB_PASS,
    database: 'iRdb',
    host: '127.0.0.1',
    port: 5432,
  },
  test: {
    user: 'postgres',
    password: process.env.DB_PASS,
    database: 'irdb_test',
    host: '127.0.0.1',
    port: 5432,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
