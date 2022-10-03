import { subscriptionWithClientId } from 'graphql-relay-subscription';
import { GraphQLString } from 'graphql';
import { TweetType } from '../tweetType';
import { GraphQLContext } from '../../../getContext';
import { findTweetById } from '../tweetService';

const TweetNewSubscription = subscriptionWithClientId<any, GraphQLContext>({
  name: 'tweet',
  inputFields: {
    id: { type: GraphQLString },
  },
  outputFields: {
    tweet: {
      type: TweetType,
      resolve: async ({ id }) => findTweetById({ id }),
    },
  },
  subscribe: (_, { user, pubSub }) => {
    // if (!user) {
    //   throw new Error('User not logged in');
    // }
    return pubSub.asyncIterator('tweet');
  },
  getPayload: (obj, input, context, info) => {
    return { id: obj.tweet.data.id };
  },
});

export default TweetNewSubscription;
