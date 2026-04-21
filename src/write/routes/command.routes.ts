import { Router } from 'express';
import { CreateProductCommand } from '../commands/create-product.command';
import { validateCreateProductInput } from '../../shared/validate-create-product';

export const createCommandRouter = (command: CreateProductCommand): Router => {
  const router = Router();

  router.post('/products', async (req, res, next) => {
    try {
      const input = validateCreateProductInput(req.body);
      const created = await command.execute(input);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
