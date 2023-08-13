import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "../dist/index.js"],
    },
  },
  overwrite: true,
  schema: "./schema/schema.json",
};

export default config;
