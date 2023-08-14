import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import { isScalarType } from "graphql";

import type { TypeScriptPluginConfig } from "./config";
import { isBuiltInScalar, isDoubleUnderline } from "./utils";

export const plugin: PluginFunction<
  TypeScriptPluginConfig,
  Types.PluginOutput
> = (schema) => {
  const typeMap = schema.getTypeMap();
  const allTypeNames = Object.keys(typeMap);

  const getTypeNames = allTypeNames.filter((typeName) => {
    const type = typeMap[typeName];

    return (
      !isScalarType(type) &&
      !isBuiltInScalar(typeName) &&
      !isDoubleUnderline(typeName)
    );
  });

  const unionTypeName = getTypeNames
    .map((typeName) => `'${typeName}'`)
    .join(" | ");
  const result = getTypeNames
    .map((typeName) => {
      console.log({ typeName });

      return `export const is${typeName} = (field: { __typename?: ${unionTypeName}; }): field is ${typeName} => field.__typename === '${typeName}';`;
    })
    .filter(Boolean)
    .join("\n");

  return result;
};
