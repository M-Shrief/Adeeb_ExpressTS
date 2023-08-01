import { config } from 'dotenv';
config();

export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DB_URL,
  DB_NAME,
  DB_NAME_TEST,
  JWT_PRIVATE,
} = process.env;
