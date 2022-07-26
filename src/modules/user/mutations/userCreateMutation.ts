import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../userModel';
import { UserType } from '../userType';
import { User } from '../userModel';

export const CreateUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  description: 'Creates a new user',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (userInfo: User) => {
    const { username, ...accountInfo } = userInfo;
    const user = new UserModel({
      username,
      ...accountInfo,
    });

    return user.save();
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: async ({ username }) => UserModel.findOne({ username }),
    },
  },
});
