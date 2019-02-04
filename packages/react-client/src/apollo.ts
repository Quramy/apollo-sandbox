import { ApolloClient } from "apollo-client";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory"

export function createClient() {
  const cache = new InMemoryCache();
  const httpLink = new HttpLink({ uri: "/graphql" });
  const link = createPersistedQueryLink({
    useGETForHashedQueries: true,
    // the `__signature__` field is attached by custom ts transformer.
    generateHash: (q: any) => q["__signature__"],
    disable: () => location.port !== "4100",
  }).concat(httpLink);
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
}
