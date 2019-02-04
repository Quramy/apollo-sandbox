import { ApolloClient } from "apollo-client";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory"

export function createClient() {
  const cache = new InMemoryCache();
  const httpLink = new HttpLink({ uri: "/graphql" });
  const link = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(httpLink);
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
}
