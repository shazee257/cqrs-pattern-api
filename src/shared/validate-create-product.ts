import { HttpError } from './http-errors';
import { CreateProductInput } from './types';

export const validateCreateProductInput = (body: unknown): CreateProductInput => {
  if (!body || typeof body !== 'object') {
    throw new HttpError('Body must be a JSON object', 400);
  }

  const payload = body as Record<string, unknown>;
  const name = payload.name;
  const price = payload.price;

  if (typeof name !== 'string' || name.trim().length === 0) {
    throw new HttpError('name is required and must be a non-empty string', 400);
  }

  if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {
    throw new HttpError('price is required and must be a non-negative number', 400);
  }

  return {
    name: name.trim(),
    price
  };
};
