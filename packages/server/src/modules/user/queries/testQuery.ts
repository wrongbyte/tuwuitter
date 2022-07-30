import { GraphQLString, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';

import { version as packageVersion } from '../../../../package.json';

export const VersionQuery: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(GraphQLString),
  resolve: () => packageVersion,
};
