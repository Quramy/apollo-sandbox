# apollo sandbox

A GraphQL(Apollo) sample repository.

It includes:

- Persistent query demonstration using `apollo client:extract` and typescript custom transformer.

## Getting started

```sh
$ yarn bootstrap
$ yarn watch
$ open http://localhost:4000/
```

### Create GraphQL Manifest

```sh
$ cd packages/react-client
$ yarn graphql:manifest
```

The above command creates graphql-manifest.json under the `dist` dir.
And this file will be loaded by Apollo Server and used as persisted query cache.
