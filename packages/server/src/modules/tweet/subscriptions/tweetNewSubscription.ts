import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { TweetType } from '../tweetType';
import { GraphQLContext } from '../../../getContext';
import { findTweetById } from '../tweetService';
import { pubSub } from '../../../getContext';

const TweetNewSubscription = subscriptionWithClientId<any, GraphQLContext>({
  name: 'TweetNew',
  inputFields: {},
  outputFields: {
    tweet: {
      type: TweetType,
      resolve: async ({ tweetId }) => findTweetById({ id: tweetId }),
    },
  },
  subscribe: (_, ctx) => {
    return pubSub.asyncIterator('tweet');
  },
  getPayload: (obj, input, context, info) => {
    return { tweetId: obj.tweet.data.id };
  },
});

export default TweetNewSubscription;
