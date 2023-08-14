import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";

import type { TypeScriptPluginConfig } from "./config";

export const plugin: PluginFunction<
  TypeScriptPluginConfig,
  Types.PluginOutput
> = (schema, documents, config) => {
  console.log({ config, documents, schema });

  return "type T = string;";
};
