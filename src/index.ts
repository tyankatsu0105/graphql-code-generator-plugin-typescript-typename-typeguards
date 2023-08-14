import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { isScalarType } from "graphql";

import type { TypeScriptPluginConfig } from "./config";
import { isBuiltInScalar, isDoubleUnderline } from "./utils";

export const plugin: PluginFunction<
  TypeScriptPluginConfig,
  Types.PluginOutput
> = (schema) => {
  const typeMap = schema.getTypeMap();
  const typeNames = Object.keys(typeMap);

  const result = typeNames
    .map((typeName) => {
      const type = typeMap[typeName];
      if (
        isScalarType(type) ||
        isBuiltInScalar(typeName) ||
        isDoubleUnderline(typeName)
      )
        return;

      return `export const is${typeName} = (field: { __typename?: string; }): field is ${typeName} => field.__typename === '${typeName}';`;
    })
    .filter(Boolean)
    .join("\n");

  return result;
};
