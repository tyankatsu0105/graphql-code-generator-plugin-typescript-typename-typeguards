import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { join } from "path";

import { plugin } from "../src/index";

import { it, expect } from "vitest";
import { readFileSync } from "fs";

/**
 * @example
 * import { createPluginTester } from "../../util";
 *
 * describe("plugin", () => {
 *   const { pluginTester } = createPluginTester(__dirname);
 *
 *   pluginTester("aaaaaaaa");
 * });
 */
export const createPluginTester = (dirname: typeof __dirname) => {
  const pluginTester = (
    testcase: string,
    params?: {
      filePath?: {
        /**
         * @default
         * schema.graphql
         * @example
         * ./path/to/schema.graphql
         */
        schema?: string;
        /**
         * @default
         * output.ts
         * @example
         * ./path/to/output.ts
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
    },
  ) => {
    it(testcase, () => {
      const schemaPath = params?.filePath?.schema ?? "schema.graphql";
      const outputPath = params?.filePath?.output ?? "output.ts";
      const schema = loadSchemaSync(join(dirname, schemaPath), {
        loaders: [new GraphQLFileLoader()],
      });
      const documents = params?.documents ?? [];
      const config = params?.config ?? {};

      const result = plugin(schema, documents, config);
      const expected = readFileSync(join(dirname, outputPath), "utf-8");

      expect(result).toBe(expected);
    });
  };

  return { pluginTester };
};
