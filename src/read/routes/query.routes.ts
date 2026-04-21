import { Router } from 'express';
import { GetAllProductsQuery } from '../queries/get-all-products.query';
import { GetProductByIdQuery } from '../queries/get-product-by-id.query';

export const createQueryRouter = (
  getAllProductsQuery: GetAllProductsQuery,
  getProductByIdQuery: GetProductByIdQuery
): Router => {
  const router = Router();

  router.get('/products', async (_req, res, next) => {
    try {
      const products = await getAllProductsQuery.execute();
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  router.get('/products/:id', async (req, res, next) => {
    try {
      const product = await getProductByIdQuery.execute(req.params.id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
