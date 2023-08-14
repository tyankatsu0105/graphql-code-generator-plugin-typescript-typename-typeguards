const scalars  ={
    'Boolean': 'Boolean',
    'Float': 'Float',
    'ID': 'ID',
    'Int': 'Int',
    'String': 'String',
} as const

/**
 * Checks whether a given GraphQL type name is a built-in scalar type.
 * @see https://spec.graphql.org/October2021/#sec-Scalars
 * @example
 * isBuiltInScalar('String') // true
 */
export const isBuiltInScalar = (typeName: string) => Object.values<string>(scalars).includes(typeName);

/**
 * Checks whether a given GraphQL type name is a starting with double underline.
 * @example
 * isDoubleUnderline('__Schema') // true
 */
export const isDoubleUnderline = (typeName: string) => typeName.startsWith('__')