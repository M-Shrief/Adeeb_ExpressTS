import fs from 'fs'
// Utils
import { logger } from '../utils/logger';

const {
  DB_CONTAINER,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env

export const DB_URL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_CONTAINER}:${DB_PORT}/${DB_NAME}`

export let JWT_PRIVATE: string = '';

if (process.env.JWT_PRIVATE_FILE) {
  JWT_PRIVATE = fs.readFileSync(process.env.JWT_PRIVATE_FILE!).toString().trim()
} else {
  console.error("JWT Private key is not defined")
}

export const {
  NODE_ENV,
  PORT,
  LOG_DIR,
  REDIS,
  CORS_ORIGIN
} = process.env;
