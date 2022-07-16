import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import * as userMutations from '../modules/user/mutations';
import { UserModel } from '../modules/user/userModel';
import { UserType } from '../modules/user/userType';
// THIS IS A TEST

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
