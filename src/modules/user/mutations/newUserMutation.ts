import { UserType } from '../userType';
import { UserModel } from '../userModel';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const UserRegisterMutation = new GraphQLObjectType({
  name: 'UserRegister',
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
