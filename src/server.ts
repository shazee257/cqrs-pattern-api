import { createApp } from './app';
import { connectDatabases, disconnectDatabases } from './config/database';
import { env } from './config/env';
import { createProductWriteModel } from './write/models/product-write.model';
import { createProductReadModel } from './read/models/product-read.model';
import { ProductWriteRepository } from './write/repositories/product-write.repository';
import { ProductReadRepository } from './read/repositories/product-read.repository';
import { CreateProductCommand } from './write/commands/create-product.command';
import { GetAllProductsQuery } from './read/queries/get-all-products.query';
import { GetProductByIdQuery } from './read/queries/get-product-by-id.query';

const start = async () => {
  const { writeConnection, readConnection } = await connectDatabases();

  const writeModel = createProductWriteModel(writeConnection);
  const readModel = createProductReadModel(readConnection);

  const writeRepo = new ProductWriteRepository(writeModel);
  const readRepo = new ProductReadRepository(readModel);

  const createProductCommand = new CreateProductCommand(writeRepo, readRepo);
  const getAllProductsQuery = new GetAllProductsQuery(readRepo);
  const getProductByIdQuery = new GetProductByIdQuery(readRepo);

  const app = createApp({
    createProductCommand,
    getAllProductsQuery,
    getProductByIdQuery
  });

  const server = app.listen(env.port, () => {
    console.log(`CQRS API running on http://localhost:${env.port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await disconnectDatabases();
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

start().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : 'Failed to start server';
  console.error(message);
  process.exit(1);
});
