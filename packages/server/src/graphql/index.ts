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
    nodes: [Product!]! @cacheControl(maxAge: 300)
    totalCount: Int!
  }
  type User {
    id: ID!
    name: String!
    wishlist: ProductConnection!
  }
  type Query {
    user: User!
    ranking: ProductConnection! @cacheControl(maxAge: 300)
    product(id: ID!): Product @cacheControl(maxAge: 3600)
  }
`;

export const resolvers: IResolvers = {
  Query: {
    product: (root, { id }: { id: string }) => {
      const found = getAllProducts().find(p => p.id === id);
      if (!found) return null;
      return found;
    },
    ranking: () => {
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
