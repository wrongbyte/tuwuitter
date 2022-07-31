import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Tweet, TweetModel } from '../tweetModel';
import { findTweetById } from '../tweetService';
import { TweetType } from '../tweetType';

//TODO: needs to link the current user as the author

export const CreateTweetMutation = mutationWithClientMutationId({
  name: 'CreateTweet',
  description: 'Posts a new tweet',
  inputFields: {
    author: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    replies: { type: new GraphQLList(GraphQLString) },
  },

  mutateAndGetPayload: async (tweetPayload: Tweet) => {
    const tweet = new TweetModel(tweetPayload);
    return tweet.save();
  },

  outputFields: {
    tweet: {
      type: TweetType,
      resolve: async ({ id }) => findTweetById({ id }),
    },
  },
});
