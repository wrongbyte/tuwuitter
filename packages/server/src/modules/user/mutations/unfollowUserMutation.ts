import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLContext } from '../../../getContext';
import { UserModel } from '../userModel';
import * as UserLoader from '../UserLoader';
import { UserType } from '../userType';
import { User } from '../userModel';

export const UnfollowUserMutation = mutationWithClientMutationId({
  name: 'UnfolowUser',
  description:
    'Removes the target user from the list of followed accounts of current user logged in',
  inputFields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
  },

  mutateAndGetPayload: async (userPayload: User, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('User not logged in');
    }
    const { username } = userPayload;

    if (username === ctx.user.username) {
      throw new Error('You cannot unfollow yourself.');
    }

    const targetUser = await UserModel.findOne({ username });

    if (!targetUser) {
      throw new Error('This user does not exist.');
    }

    const isFollowing = await UserModel.findOne({
      username: ctx?.user.username,
      following: targetUser.id,
    });

    if (!isFollowing) {
      throw new Error("You already don't follow this user.");
    }

    await UserModel.findOneAndUpdate(
      { _id: ctx.user.id },
      { $pull: { following: targetUser._id as any } }
    );

    const user = await UserModel.findOneAndUpdate(
      { _id: targetUser._id },
      { $pull: { followers: ctx.user.id as any } },
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
