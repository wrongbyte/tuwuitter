import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { VersionQuery } from '../modules/user/queries/testQuery';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    VersionQuery,
  }),
});
