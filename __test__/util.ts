import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { readFileSync } from "fs";
import { join } from "path";
import { expect, it } from "vitest";

import { plugin } from "../src/index";

export const pluginTester = (
  fixturePath: string,
  testcase: string,
  params?: {
    fileName?: {
      /**
       * @default
       * schema.graphql
       * @example
       * input.graphql
       */
      schema?: string;
      /**
       * @default
       * output.ts
       * @example
       * generated.ts
       */
      output?: string;
    };
    /**
     * @default []
     */
    documents?: Parameters<typeof plugin>[1];

    /**
     * @default {}
     */
    config?: Parameters<typeof plugin>[2];
  }
) => {
  it(testcase, () => {
    const schemaFile = params?.fileName?.schema ?? "schema.graphql";
    const schemaFilePath = join("__test__/fixtures", fixturePath, schemaFile);

    const outputFile = params?.fileName?.output ?? "output.ts";
    const outputFilePath = join("__test__/fixtures", fixturePath, outputFile);

    const schema = loadSchemaSync(schemaFilePath, {
      loaders: [new GraphQLFileLoader()],
    });
    const documents = params?.documents ?? [];
    const config = params?.config ?? {};

    const result = plugin(schema, documents, config);
    const expected = readFileSync(outputFilePath, "utf-8");

    expect(result).toBe(expected);
  });
};
