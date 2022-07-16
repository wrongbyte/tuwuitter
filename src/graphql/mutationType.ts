import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import * as userMutations from '../modules/user/mutations';
import { UserModel } from '../modules/user/userModel';
import { UserType } from '../modules/user/userType';
// THIS IS A TEST

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Create a new user',
  fields: {
    newUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        displayName: { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new UserModel({
          username: args.username,
          displayName: args.displayName,
          birthday: args.birthday,
          email: args.email,
          password: args.password,
        });

        return user.save();
      },
    },
  },
});
