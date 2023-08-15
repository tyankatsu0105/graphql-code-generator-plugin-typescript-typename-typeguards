export const isQuery = (field: { __typename?: 'Query' | 'Post' | 'Comment'; }): field is Query => field.__typename === 'Query';
export const isPost = (field: { __typename?: 'Query' | 'Post' | 'Comment'; }): field is Post => field.__typename === 'Post';
export const isComment = (field: { __typename?: 'Query' | 'Post' | 'Comment'; }): field is Comment => field.__typename === 'Comment';