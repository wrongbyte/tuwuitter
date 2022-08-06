import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { signTokens } from '../userAuth';
import { findUserLoginData } from '../userService';
import { UserType } from '../userType';

export const userLoginMutation = mutationWithClientMutationId({
  name: 'UserLogin',
  description: 'Logs in an user or raises an error',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async ({ username, password }) => {
    const user = await findUserLoginData({ username });
    if (!user) {
      throw new Error('User not found');
    }

    if (!(await user.comparePasswords(password, user.password))) {
      throw new Error('Incorrect password');
    }

    const { access_token, refresh_token } = await signTokens(user);

    return {
      access_token,
      user,
    };
  },

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ access_token }) => access_token,
    },
    currentUser: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
});
