import { parse } from "graphql";
import { defaultGenerateHash } from "apollo-link-persisted-queries";

export function createCache() {
  let manifest: { operations: { document: string, signature: string}[] } = { operations: [] };
  try {
    manifest = require("../../../../dist/graphql-manifest.json");
  } catch (e) {
    console.warn("No manifest file. Try to run yarn graphql:manifest script in react-client dir.");
  }

  const queryMap = manifest.operations.reduce((acc, { document }) => {
    const key = defaultGenerateHash(parse(document));
    return { ...acc, [key]: { document } };
  }, { } as { [key: string]: { document: string } });

  return {
    // This cache object resolves GraphQL Query documents from sha256 hash.
    get: (key: string) => {
      const hit = key.match(/:([^:]*)$/)
      if (!hit) return Promise.reject<string>();
      const [_, k] = hit;
      const operation = queryMap[k];
      if (!operation) return Promise.reject<string>();
      return Promise.resolve(operation.document);
    },
    set: () => Promise.resolve(),
    delete: () => Promise.resolve(false),
  }
}
