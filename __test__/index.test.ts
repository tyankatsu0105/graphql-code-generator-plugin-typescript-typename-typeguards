import { describe } from "vitest";

import { pluginTester } from "./util";

describe("plugin", () => {
  pluginTester(
    "no-config",
    "Generate user defined type guard functions from user defined type of schema."
  );

  pluginTester(
    "argsAsStringLiteralUnion",
    "Generate user defined type guard functions with string union.",
    {
      config: {
        argsAsStringLiteralUnion: true,
      },
    }
  );
});
