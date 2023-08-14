# FAQ
## Why set `NODE_ENV=production` to test?

Because solving this problem:
```bash
If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results
```

These are related:
- https://github.com/graphql/graphql-js/pull/1174
- https://github.com/graphql/graphql-js/issues/1358