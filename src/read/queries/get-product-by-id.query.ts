import { ProductDTO } from '../../shared/types';
import { ProductReadRepository } from '../repositories/product-read.repository';

export class GetProductByIdQuery {
  constructor(private readonly readRepo: ProductReadRepository) {}

  async execute(id: string): Promise<ProductDTO | null> {
    return this.readRepo.findById(id);
  }
}
