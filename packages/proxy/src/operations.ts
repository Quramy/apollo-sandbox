export function createOperationsMap() {

  let manifest: { operations: { document: string, signature: string}[] } = { operations: [] };

  try {
    // Read manifest file generated by `appolo client:extract`
    manifest = require("../../../dist/graphql-manifest.json");
  } catch (e) {
    console.warn("No manifest file. Try to run yarn graphql:manifest script in react-client dir.");
  }

  return manifest.operations.reduce((acc, { document, signature }) => {
    return { ...acc, [signature]: { document } };
  }, { } as { [key: string]: { document: string } });
}