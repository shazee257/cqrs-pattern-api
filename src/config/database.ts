import mongoose, { Connection } from 'mongoose';
import { env } from './env';

export type DbConnections = {
  writeConnection: Connection;
  readConnection: Connection;
};

let cachedConnections: DbConnections | null = null;

export const connectDatabases = async (): Promise<DbConnections> => {
  if (cachedConnections) {
    return cachedConnections;
  }

  const writeConnection = await mongoose.createConnection(env.mongodbUri, {
    dbName: env.writeDbName
  }).asPromise();

  const readConnection = await mongoose.createConnection(env.mongodbUri, {
    dbName: env.readDbName
  }).asPromise();

  cachedConnections = { writeConnection, readConnection };

  return cachedConnections;
};

export const disconnectDatabases = async (): Promise<void> => {
  if (!cachedConnections) {
    return;
  }

  await cachedConnections.writeConnection.close();
  await cachedConnections.readConnection.close();
  cachedConnections = null;
};
