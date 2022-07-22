import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import * as userMutations from '../modules/user/mutations';
// THIS IS A TEST

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
    ...userMutations,
  }),
});
