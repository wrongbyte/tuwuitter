import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { nodeField, nodesField } from './typeRegister';
import * as userQueries from '../modules/user/queries';
import { UserConnection, UserType } from '../modules/user/userType';
import { connectionArgs } from '@entria/graphql-mongo-helpers';
import * as UserLoader from '../modules/user/UserLoader';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root of queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    users: {
      type: new GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => {
        return await UserLoader.loadAll(context, args);
      },
    },
    me: {
      type: UserType,
      resolve: (root, args, context) =>
        UserLoader.load(context, context.user?._id),
    },
    ...userQueries,
  }),
});
