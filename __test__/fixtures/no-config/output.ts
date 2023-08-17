export const isQuery = (field: { __typename?: string; }): field is Query => field.__typename === 'Query';
export const isPost = (field: { __typename?: string; }): field is Post => field.__typename === 'Post';
export const isComment = (field: { __typename?: string; }): field is Comment => field.__typename === 'Comment';