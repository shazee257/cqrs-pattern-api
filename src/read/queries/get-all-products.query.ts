import { ProductDTO } from '../../shared/types';
import { ProductReadRepository } from '../repositories/product-read.repository';

export class GetAllProductsQuery {
  constructor(private readonly readRepo: ProductReadRepository) {}

  async execute(): Promise<ProductDTO[]> {
    return this.readRepo.findAll();
  }
}
