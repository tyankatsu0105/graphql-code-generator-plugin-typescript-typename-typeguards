import { describe } from "vitest";

import { createPluginTester } from "../../util";

describe("plugin", () => {
  const { pluginTester } = createPluginTester(__dirname);

  pluginTester("aaaaaaaa");
});
