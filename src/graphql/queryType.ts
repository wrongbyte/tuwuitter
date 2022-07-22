import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { version as packageVersion } from '../../package.json';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query',
  fields: () => ({
    version: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: () => packageVersion,
    },
  }),
});
