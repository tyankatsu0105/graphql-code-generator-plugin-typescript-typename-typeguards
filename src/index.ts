import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
  GraphQLSchema,
  isIntrospectionType,
  isScalarType,
  isSpecifiedScalarType,
} from "graphql";

import type { TypeScriptPluginConfig } from "./config";

const getUserDefinedTypes = (schema: GraphQLSchema) => {
  const typeMap = schema.getTypeMap();
  const allTypeNames = Object.keys(typeMap);

  const userDefinedTypes = allTypeNames.filter((typeName) => {
    const type = typeMap[typeName];
    if (!type) return;

    return (
      !isScalarType(type) &&
      !isSpecifiedScalarType(type) &&
      !isIntrospectionType(type)
    );
  });

  return { userDefinedTypes };
};

export const plugin: PluginFunction<
  TypeScriptPluginConfig,
  Types.PluginOutput
> = (schema) => {
  const { userDefinedTypes } = getUserDefinedTypes(schema);

  const unionTypeName = userDefinedTypes.reduce((acc, typeName) => {
    if (acc === "") return `'${typeName}'`;

    return `${acc} | '${typeName}'`;
  }, "");

  const result = userDefinedTypes
    .map((typeName) => {
      return `export const is${typeName} = (field: { __typename?: ${unionTypeName}; }): field is ${typeName} => field.__typename === '${typeName}';`;
    })
    .filter(Boolean)
    .join("\n");

  return result;
};
