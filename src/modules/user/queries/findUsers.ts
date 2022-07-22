import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserModel } from '../userModel';
import { UserType } from '../userType';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Find all users',
  fields: {
    allUsers: {
      type: new GraphQLList(UserType),
      async resolve(parent, args) {
        const user = await UserModel.find({});
        return user;
      },
    },
  },
});
