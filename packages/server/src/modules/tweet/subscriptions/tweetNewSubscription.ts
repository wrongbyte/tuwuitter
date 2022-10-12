import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { GraphQLContext } from '../../../getContext';
import { findTweetById } from '../tweetService';
import { TweetConnection, TweetType } from '../tweetType';
import { pubSub } from '../../../getContext';
import { toGlobalId } from 'graphql-relay';

const TweetNewSubscription = subscriptionWithClientId<any, GraphQLContext>({
  name: 'TweetNew',
  inputFields: {},
  outputFields: {
    tweet: {
      type: TweetType,
      resolve: async ({ id }, _, context) => {
        const tweet = await findTweetById({ id });
        return tweet;
      },
    },
  },
  subscribe: (_, ctx) => {
    return pubSub.asyncIterator('tweet');
  },
  getPayload: (obj) => {
    return { id: obj.tweet.tweetId };
  },
});

export default TweetNewSubscription;
