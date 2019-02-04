# apollo sandbox

A GraphQL(Apollo) sample repository.

It includes:

- Persistent query demonstration using `apollo client:extract` and typescript custom transformer.

## Getting started

```sh
$ yarn bootstrap
$ yarn watch
$ yarn manifest
$ open http://localhost:4100/
```

### Create GraphQL Manifest

```sh
$ yarn manifest
```

The above command creates graphql-manifest.json under the `dist` dir.
And this file will be loaded by Apollo Server and used as persisted query cache.
