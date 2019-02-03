export function createCache() {
  let manifest: { operations: any[] } = { operations: [] };
  try {
    manifest = require("../../../../dist/graphql-manifest.json");
  } catch (e) {
    console.warn("No manifest file. Try to run yarn graphql:manifest script in react-client dir.");
  }
  const queryMap = manifest.operations.reduce((acc: any, x: any) => ({ ...acc, [x.signature]: x }), { });
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
