import { withFilter, connectionArgs } from '@entria/graphql-mongo-helpers';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { UserModel } from '../../user/userModel';
import * as TweetLoader from '../TweetLoader';
import { TweetConnection } from '../tweetType';

export const findTimelineTweets: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(TweetConnection.connectionType),
  args: { ...connectionArgs },
  resolve: async (_, args, context) => {
    if (!context.user) {
      throw new Error('User not logged in');
    }
    const currentUser = await UserModel.findById(context.user._id);
    return await TweetLoader.loadAll(
      context,
      withFilter(args, { author: { $in: currentUser.following } })
    );
  },
};
