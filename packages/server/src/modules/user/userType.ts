import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { registerTypeLoader, nodeInterface } from '../../graphql/typeRegister';
import { connectionDefinitions } from '@entria/graphql-mongo-helpers';
import { User } from './userModel';
import { load } from './UserLoader';

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
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.password,
    },
    following: {
      type: new GraphQLList(GraphQLString),
      resolve: (user) => user.following,
    },
    followers: {
      type: new GraphQLList(GraphQLString),
      resolve: (user) => user.followers,
    },
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
