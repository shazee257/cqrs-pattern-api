import { Connection, InferSchemaType, Schema } from 'mongoose';

const productReadSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
}, { versionKey: false, collection: 'products_read' });

productReadSchema.index({ name: 1 });

export type ProductReadDocument = InferSchemaType<typeof productReadSchema>;

export const createProductReadModel = (connection: Connection) => {
    return connection.model<ProductReadDocument>('ProductRead', productReadSchema);
};
