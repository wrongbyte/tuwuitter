import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { nodeField, nodesField } from './typeRegister';
import * as userQueries from '../modules/user/queries';
import * as tweetQueries from '../modules/tweet/queries';
import { UserConnection, UserType } from '../modules/user/userType';
import { connectionArgs } from '@entria/graphql-mongo-helpers';
import * as UserLoader from '../modules/user/UserLoader';
import * as TweetLoader from '../modules/tweet/TweetLoader';
import { TweetConnection } from '../modules/tweet/tweetType';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    tweets: {
      type: new GraphQLNonNull(TweetConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => {
        return await TweetLoader.loadAll(context, args);
      },
    },
    me: {
      type: UserType,
      resolve: (root, args, context) =>
        UserLoader.load(context, context.user?._id),
    },
    ...userQueries,
    ...tweetQueries,
  }),
});
