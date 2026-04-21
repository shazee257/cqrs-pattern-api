import express from 'express';
import { CreateProductCommand } from './write/commands/create-product.command';
import { GetAllProductsQuery } from './read/queries/get-all-products.query';
import { GetProductByIdQuery } from './read/queries/get-product-by-id.query';
import { createCommandRouter } from './write/routes/command.routes';
import { createQueryRouter } from './read/routes/query.routes';
import { HttpError } from './shared/http-errors';

type AppDependencies = {
  createProductCommand: CreateProductCommand;
  getAllProductsQuery: GetAllProductsQuery;
  getProductByIdQuery: GetProductByIdQuery;
};

export const createApp = (deps: AppDependencies) => {
  const app = express();

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/commands', createCommandRouter(deps.createProductCommand));
  app.use('/queries', createQueryRouter(deps.getAllProductsQuery, deps.getProductByIdQuery));
;
  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: 'Unexpected error' });
  });

  return app;
};
