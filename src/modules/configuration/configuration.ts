import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  dbUsername: process.env.DATABASE_USERNAME,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbHost: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT,
  dbName: process.env.DATABASE_NAME,
  severPort: process.env.SERVER_PORT,
}));
