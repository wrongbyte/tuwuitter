import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLContext } from '../../../getContext';
import { UserModel } from '../userModel';
import * as UserLoader from '../UserLoader';
import { UserType } from '../userType';
import { User } from '../userModel';

// TODO: REFACTOR THIS MESS
export const FollowUserMutation = mutationWithClientMutationId({
  name: 'FolowUser',
  description:
    'Adds the target user to the list of followed accounts of current user logged in',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (userPayload: User, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('User not logged in');
    }
    const { username } = userPayload;

    if (username === ctx.user.username) {
      throw new Error('You cannot follow yourself.');
    }

    const targetUser = await UserModel.findOne({ username });

    if (!targetUser) {
      throw new Error('This user does not exist.');
    }

    const isFollowing = await UserModel.findOne({
      username: ctx?.user.username,
      following: targetUser.id,
    });

    if (isFollowing) {
      throw new Error('You already follow this user.');
    }

    await UserModel.findOneAndUpdate(
      { _id: ctx.user.id },
      { $addToSet: { following: targetUser._id as any } }
    );

    const user = await UserModel.findOneAndUpdate(
      { _id: targetUser._id },
      { $addToSet: { followers: ctx.user.id as any } },
      { new: true }
    );

    return { user };
  },

  outputFields: {
    user: {
      type: UserType,
      resolve: async ({ user }, args, context) => {
        return await UserLoader.load(context, user.id);
      },
    },
  },
});
