import { describe } from "vitest";

import { pluginTester } from "./util";

describe("plugin", () => {
  pluginTester(
    "primary",
    "Generate user defined type guard functions from user defined type of schema."
  );
});
