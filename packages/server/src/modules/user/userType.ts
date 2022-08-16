import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { registerTypeLoader, nodeInterface } from '../../graphql/typeRegister';
import {
  connectionArgs,
  connectionDefinitions,
  withFilter,
} from '@entria/graphql-mongo-helpers';
import * as TweetLoader from '../tweet/TweetLoader';
import { User } from './userModel';
import { load } from './UserLoader';
import { TweetConnection } from '../tweet/tweetType';

export const UserType = new GraphQLObjectType<User>({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    username: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.username,
    },
    displayName: {
      type: GraphQLString,
      resolve: (user) => user.displayName,
    },
    birthday: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.birthday,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.password,
    },
    following: {
      type: new GraphQLList(UserType),
      resolve: (user) => user.following,
    },
    followers: {
      type: new GraphQLList(UserType),
      resolve: (user) => user.followers,
    },
    tweets: {
      type: new GraphQLNonNull(TweetConnection.connectionType),
      args: { ...connectionArgs },
      resolve: async (user, args, context) => {
        return await TweetLoader.loadAll(
          context,
          withFilter(args, { author: user.id })
        );
      },
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
