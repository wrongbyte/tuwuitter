import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import * as UserLoader from '../UserLoader';
import { UserModel } from '../userModel';
import { UserType } from '../userType';

export const findUserByUsername: GraphQLFieldConfig<any, any, any> = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const user = await UserModel.findOne({ username: args.username });
    return await UserLoader.load(context, user.id);
  },
};
