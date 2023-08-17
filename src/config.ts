export type Config = {
  /**
   * Use string union types instead of string type.
   * @default false
   * @example
   * import type { CodegenConfig } from '@graphql-codegen/cli'
   *
   * const config: CodegenConfig = {
   *   // ...
   *   generates: {
   *     'path/to/file.ts': {
   *       plugins: ['graphql-code-generator-plugin-typescript-typename-typeguards'],
   *       config: {
   *         argsAsStringLiteralUnion: true
   *       }
   *     }
   *   }
   * }
   */
  argsAsStringLiteralUnion?: boolean;
};

export const getConfig = (config: Config): Config => {
  return {
    argsAsStringLiteralUnion: config.argsAsStringLiteralUnion ?? false,
  };
};
