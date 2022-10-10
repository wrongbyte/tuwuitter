import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import { GraphQLContext } from '../../../getContext';
import { UserModel } from '../../user/userModel';
import { Tweet, TweetModel } from '../tweetModel';
import { findTweetById } from '../tweetService';
import { TweetType } from '../tweetType';
import * as TweetLoader from '../../tweet/TweetLoader';
import { TweetConnection } from '../tweetType';

export const CreateTweetMutation = mutationWithClientMutationId({
  name: 'CreateTweet',
  description: 'Posts a new tweet',
  inputFields: {
    content: { type: new GraphQLNonNull(GraphQLString) },
    replies: { type: new GraphQLList(GraphQLString) },
  },

  mutateAndGetPayload: async (tweetPayload: Tweet, ctx: GraphQLContext) => {
    if (!ctx?.user) {
      throw new Error('User not logged in');
    }
    const tweet = await new TweetModel({
      author: ctx.user.id,
      ...tweetPayload,
    }).save();
    await UserModel.findOneAndUpdate(
      { _id: ctx.user.id },
      { $addToSet: { tweets: tweet._id } }
    );

    ctx.pubSub.publish('tweet', {
      tweet: {
        mutation: 'POSTED',
        data: tweet,
      },
    });

    return tweet;
  },

  outputFields: {
    //todo: mudar para tweetNode
    tweet: {
      type: TweetConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const tweet = await TweetLoader.load(context, id);
        return {
          cursor: toGlobalId('Tweet', tweet._id),
          node: tweet,
        };
      },
    },
  },
});
