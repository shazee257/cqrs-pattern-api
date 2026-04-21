import { Connection, InferSchemaType, Schema } from 'mongoose';

const productWriteSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'products'
  }
);

export type ProductWriteDocument = InferSchemaType<typeof productWriteSchema>;

export const createProductWriteModel = (connection: Connection) => {
  return connection.model<ProductWriteDocument>('ProductWrite', productWriteSchema);
};
