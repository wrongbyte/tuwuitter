import { GraphQLObjectType } from 'graphql';

import TweetNewSubscription from '../modules/tweet/subscriptions/tweetNewSubscription';

export const SubscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    TweetNew: TweetNewSubscription as any,
  },
});
