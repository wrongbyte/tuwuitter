import { GraphQLObjectType } from 'graphql';
import * as userMutations from '../modules/user/mutations';
import * as tweetMutations from '../modules/tweet/mutations';
import * as likeMutations from '../modules/like/mutations';

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root of mutations',
  fields: () => ({
    ...userMutations,
    ...tweetMutations,
    ...likeMutations,
  }),
});
