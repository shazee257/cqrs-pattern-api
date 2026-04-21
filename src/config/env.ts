import dotenv from 'dotenv';

dotenv.config();

const required = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }

  return value;
};

export const env = {
  port: Number(process.env.PORT ?? 4000),
  mongodbUri: required(process.env.MONGODB_URI, 'MONGODB_URI'),
  writeDbName: process.env.WRITE_DB_NAME ?? 'cqrs_write',
  readDbName: process.env.READ_DB_NAME ?? 'cqrs_read'
};
