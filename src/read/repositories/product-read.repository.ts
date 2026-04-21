import { Model } from 'mongoose';
import { ProductReadDocument } from '../models/product-read.model';
import { ProductDTO } from '../../shared/types';

export class ProductReadRepository {
  constructor(private readonly model: Model<ProductReadDocument>) {}

  async findAll(): Promise<ProductDTO[]> {
    const docs = await this.model.find().sort({ createdAt: -1 }).lean().exec();

    return docs.map((doc) => ({
      id: doc._id,
      name: doc.name,
      price: doc.price,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    }));
  }

  async findById(id: string): Promise<ProductDTO | null> {
    const doc = await this.model.findById(id).lean().exec();
    if (!doc) {
      return null;
    }

    return {
      id: doc._id,
      name: doc.name,
      price: doc.price,
      createdAt: doc.createdAt.toISOString(),
      updatedAt: doc.updatedAt.toISOString()
    };
  }

  getModel(): Model<ProductReadDocument> {
    return this.model;
  }
}
