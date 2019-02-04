import { IResolvers } from "graphql-tools";
import { gql } from "apollo-server-express";
import { getAllProducts, getUser } from "../data";

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Int!
  }
  type ProductConnection {
    nodes: [Product!]!
    totalCount: Int!
  }
  type User {
    id: ID!
    name: String!
    wishlist: ProductConnection!
  }
  type Query {
    user: User!
    ranking: ProductConnection!
    product(id: ID!): Product
  }
`;

export const resolvers: IResolvers = {
  Query: {
    product: (root, { id }: { id: string }, ctx, { cacheControl }) => {
      const found = getAllProducts().find(p => p.id === id);
      if (!found) return null;
      cacheControl.setCacheHint({ maxAge: 120 });
      return found;
    },
    ranking: (root, { id }: { id: string }, ctx, { cacheControl }) => {
      cacheControl.setCacheHint({ maxAge: 6000 });
      return {
        nodes: getAllProducts().slice(0, 3),
        totalCount: 3
      };
    },
    user: () => {
      return getUser();
    },
  },
};
