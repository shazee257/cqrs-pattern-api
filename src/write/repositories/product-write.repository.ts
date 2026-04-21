import { Model } from 'mongoose';
import { ProductWriteDocument } from '../models/product-write.model';
import { CreateProductInput } from '../../shared/types';

export class ProductWriteRepository {
  constructor(private readonly model: Model<ProductWriteDocument>) {}

  async create(input: CreateProductInput): Promise<ProductWriteDocument & { _id: { toString(): string } }> {
    const created = await this.model.create({
      name: input.name,
      price: input.price
    });

    return created as ProductWriteDocument & { _id: { toString(): string } };
  }
}
