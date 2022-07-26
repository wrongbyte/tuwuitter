import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { signTokens } from '../userAuth';
import { UserModel } from '../userModel';
import { version as packageVersion } from '../../../../package.json';

export const userLoginMutation = mutationWithClientMutationId({
  name: 'UserLogin',
  description: 'Logs in an user or raises an error',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async ({ username, password }) => {
    const user = await UserModel.findOne({ username }).select('+password');
    if (!user) {
      throw new Error('User not found');
    }

    if (!(await user.comparePasswords(password, user.password))) {
      throw new Error('Incorrect password');
    }

    const { access_token, refresh_token } = await signTokens(user);

    return {
      access_token,
    };
  },

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ access_token }) => access_token,
    },
  },
});
