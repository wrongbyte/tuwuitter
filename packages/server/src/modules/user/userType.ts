import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
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
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(UserType, load);

export const UserConnection = connectionDefinitions({
  name: 'User',
  nodeType: UserType,
});
