import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { UserModel } from '../userModel';
import { UserType } from '../userType';

export const CreateUserMutation = mutationWithClientMutationId({
  name: 'CreateUser',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    birthday: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async ({ email, ...rest }) => {
    const user = new UserModel({
      ...rest,
      email,
    });

    return user.save();
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: async ({ email }) => UserModel.findOne({ email }),
    },
  },
});
