import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory"

export function createClient() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
    }),
    cache,
  });
  return client;
}
