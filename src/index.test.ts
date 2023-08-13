import type { Types } from "@graphql-codegen/plugin-helpers";
import { buildSchema } from "graphql";
import { describe, expect, it } from "vitest";

import { plugin } from "./index";

describe("plugin", () => {
  it("test", () => {
    const schema = buildSchema(`
        type Query {
            hello: String
        }
        `);
    const documents: Types.DocumentFile[] = [];
    const config = {};

    const result = plugin(schema, documents, config);

    expect(result).toEqual("Hello");
  });
});
