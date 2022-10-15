import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { GraphQLContext } from '../../../getContext';
import { TweetConnection, TweetType } from '../tweetType';
import { pubSub } from '../../../getContext';
import * as TweetLoader from '../TweetLoader';

const TweetNewSubscription = subscriptionWithClientId<any, GraphQLContext>({
  name: 'TweetNew',
  inputFields: {},
  outputFields: {
    tweet: {
      type: TweetConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const tweet = await TweetLoader.load(context as any, id);
        return { node: tweet };
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
