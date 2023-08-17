import type { PluginFunction, Types } from "@graphql-codegen/plugin-helpers";
import {
  GraphQLSchema,
  isIntrospectionType,
  isScalarType,
  isSpecifiedScalarType,
} from "graphql";

import { Config, getConfig } from "./config";

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

const getParameterType = (
  params: Readonly<{
    userDefinedTypes: string[];
    config: Config;
  }>
) => {
  if (!params.config.argsAsStringLiteralUnion) return "string";

  const unionTypeName = params.userDefinedTypes.reduce((acc, typeName) => {
    if (acc === "") return `'${typeName}'`;

    return `${acc} | '${typeName}'`;
  }, "");

  return unionTypeName;
};

export const plugin: PluginFunction<Config, Types.PluginOutput> = (
  schema,
  _,
  userDefinedConfig
) => {
  const config = getConfig(userDefinedConfig);
  const { userDefinedTypes } = getUserDefinedTypes(schema);

  const parameterType = getParameterType({ config, userDefinedTypes });

  const result = userDefinedTypes
    .map((typeName) => {
      return `export const is${typeName} = (field: { __typename?: ${parameterType}; }): field is ${typeName} => field.__typename === '${typeName}';`;
    })
    .filter(Boolean)
    .join("\n");

  return result;
};
