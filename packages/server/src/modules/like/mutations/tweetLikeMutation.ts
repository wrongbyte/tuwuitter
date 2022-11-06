import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLContext } from '../../../getContext';
import { TweetModel } from '../../tweet/tweetModel';
import * as TweetLoader from '../../tweet/TweetLoader';
import { LikeModel } from '../likeModel';
import { TweetType } from '../../tweet/tweetType';

type MutationArgs = {
  tweetId: string;
};

export const TweetLikeMutation = mutationWithClientMutationId({
  name: 'LikeTweet',
  description: 'Adds a new like from specific user to specific tweet',
  inputFields: {
    tweetId: { type: new GraphQLNonNull(GraphQLID) },
  },

  mutateAndGetPayload: async (args: MutationArgs, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('User not logged in');
    }

    const tweetId = fromGlobalId(args.tweetId).id;

    const tweet = await TweetModel.findOne({
      _id: tweetId,
    });

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    const userHasLiked = await LikeModel.findOne({
      tweet: tweet._id,
      user: ctx.user.id,
    });

    if (userHasLiked) {
      throw new Error('Tweet already liked');
    }

    await new LikeModel({
      tweet: tweet._id,
      user: ctx.user.id,
    }).save();

    return {
      id: tweet._id,
    };
  },
  outputFields: {
    tweet: {
      type: TweetType,
      resolve: async ({ id }, _, context) => {
        return await TweetLoader.load(context, id);
      },
    },
  },
});
