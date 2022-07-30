import { GraphQLObjectType } from 'graphql';
import * as userQueries from '../modules/user/queries';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    ...userQueries,
  }),
});
