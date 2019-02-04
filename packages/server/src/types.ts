export type Product = {
  id: string,
  name: string,
  description?: string,
  price: number,
};

export type User = {
  id: string,
  name: string,
  wishlist: {
    nodes: Product[],
    totalCount: number,
  },
};
