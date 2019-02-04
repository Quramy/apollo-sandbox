import { Product, User } from "../types";

const products = [
  { id: "p001", name: "umai bar", price: 30 },
  { id: "p002", name: "black thunder", price: 30 },
  { id: "p003", name: "yochan ika", price: 10 },
  { id: "p004", name: "papiko", price: 10 },
] as Product[];

const me = {
  id: "u001",
  name: "Quramy",
  wishlist: {
    nodes: [products[2]],
    totalCount: 1,
  },
} as User;

export const getAllProducts = () => products;
export const getUser = () => me;
