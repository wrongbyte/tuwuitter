import { PubSub } from 'graphql-subscriptions';

export const EVENTS = {
  TWEET: {
    NEW: 'TWEET_NEW',
  },
};

export default new PubSub();
