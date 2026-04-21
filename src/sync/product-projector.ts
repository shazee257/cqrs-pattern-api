import { Model } from 'mongoose';
import { ProductWriteDocument } from '../write/models/product-write.model';
import { ProductReadDocument } from '../read/models/product-read.model';

export const projectProductToReadModel = async (readModel: Model<ProductReadDocument>,
    source: {
        id: string;
        name: string;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }
): Promise<void> => {
    await readModel.updateOne(
        { _id: source.id },
        {
            $set: {
                name: source.name,
                price: source.price,
                createdAt: source.createdAt,
                updatedAt: source.updatedAt
            }
        },
        { upsert: true }
    );
};

export const mapWriteDocToProjection = (doc: ProductWriteDocument & { _id: { toString(): string } }) => {
    return {
        id: doc._id.toString(),
        name: doc.name,
        price: doc.price,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
    };
};
