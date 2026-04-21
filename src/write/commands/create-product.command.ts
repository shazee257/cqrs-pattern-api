import { ProductDTO } from '../../shared/types';
import { ProductWriteRepository } from '../repositories/product-write.repository';
import { ProductReadRepository } from '../../read/repositories/product-read.repository';
import { mapWriteDocToProjection, projectProductToReadModel } from '../../sync/product-projector';

export class CreateProductCommand {
    constructor(
        private readonly writeRepo: ProductWriteRepository,
        private readonly readRepo: ProductReadRepository
    ) { }

    async execute(input: { name: string; price: number }): Promise<ProductDTO> {
        const created = await this.writeRepo.create(input);
        const projection = mapWriteDocToProjection(created);

        await projectProductToReadModel(this.readRepo.getModel(), projection);

        return {
            id: projection.id,
            name: projection.name,
            price: projection.price,
            createdAt: projection.createdAt.toISOString(),
            updatedAt: projection.updatedAt.toISOString()
        };
    }
}
