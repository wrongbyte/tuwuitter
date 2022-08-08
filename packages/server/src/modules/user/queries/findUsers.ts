import { GraphQLFieldConfig, GraphQLList } from 'graphql';
import { UserModel } from '../userModel';
import { UserType } from '../userType';

export const FindUsersQuery: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLList(UserType),
  async resolve(parent, args) {
    const user = await UserModel.find({});
    return user;
  },
};
