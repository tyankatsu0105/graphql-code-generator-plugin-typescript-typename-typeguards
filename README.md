# GraphQL Code Generator Plugin Typescript Typename Typeguards

This is a plugin for [GraphQL Code Generator](https://graphql-code-generator.com/).  
Generate user defined type guard functions from user defined type of schema.

> What is a user defined type guard function?
> https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

## Installation

```sh
npm install -D graphql-code-generator-plugin-typescript-typename-typeguards
```

## Usage

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "graphql-code-generator-plugin-typescript-typename-typeguards",
      ],
    },
  },
};

export default config;
```

For GraphQL Code Generator v2

```yml
generates:
  src/generated/graphql.ts:
    plugins:
      - typescript
      - graphql-code-generator-plugin-typescript-typename-typeguards
```

## Example

### Input

```graphql
type User {
  id: ID!
  name: String!
  age: Int!
  email: String!
  address: Address!
  friends: [User!]!
}

type Address {
  country: String!
  prefecture: String!
  city: String!
  street: String!
}
```

### Output

```ts
export const isUser = (field: {
  __typename?: "User" | "Address";
}): field is User => field.__typename === "User";

export const isAddress = (field: {
  __typename?: "User" | "Address";
}): field is Address => field.__typename === "Address";
```
