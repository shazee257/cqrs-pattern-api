export type CreateProductInput = {
  name: string;
  price: number;
};

export type ProductDTO = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};
