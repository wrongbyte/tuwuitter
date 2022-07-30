import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { User } from './userModel';

export const UserType = new GraphQLObjectType<User>({
  name: 'User',
  fields: () => ({
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
});
