import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../userModel';
import { UserType } from '../userType';
import { User } from '../userModel';
import { findUserByEmail, findUserByUsername } from '../userService';

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

  mutateAndGetPayload: async (userPayload: User) => {
    const { email, username, ...accountInfo } = userPayload;

    const existingUser = await findUserByEmail({ email });
    if (existingUser) {
      throw new Error('This email has already been registered');
    }

    const usernameTaken = await findUserByUsername({ username });
    if (usernameTaken) {
      throw new Error('This username is already in use');
    }

    const user = new UserModel({
      email,
      username,
      ...accountInfo,
    });

    return user.save();
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: async ({ email }) => findUserByEmail({ email }),
    },
  },
});
