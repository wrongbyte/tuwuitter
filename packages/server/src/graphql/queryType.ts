import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { nodeField, nodesField } from './typeRegister';
import * as userQueries from '../modules/user/queries';
import { UserConnection, UserType } from '../modules/user/userType';
import { connectionArgs, withFilter } from '@entria/graphql-mongo-helpers';
import * as UserLoader from '../modules/user/UserLoader';
import { UserModel } from '../modules/user/userModel';

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
    findUserByUsername: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
      },
      resolve: async (_, args, context) => {
        const user = await UserModel.findOne({ username: args.username });
        return await UserLoader.load(context, user.id);
      },
    },
    ...userQueries,
  }),
});
