import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { Tweet } from './tweetModel';

export const TweetType = new GraphQLObjectType<Tweet>({
  name: 'Tweet',
  fields: () => ({
    author: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (tweet) => tweet.author,
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (tweet) => tweet.content,
    },
    likedBy: {
      type: new GraphQLList(GraphQLString),
      resolve: (tweet) => tweet.likedBy,
    },
    retweetedBy: {
      type: new GraphQLList(GraphQLString),
      resolve: (tweet) => tweet.retweetedBy,
    },
    replies: {
      type: new GraphQLList(GraphQLString),
      resolve: (tweet) => tweet.replies,
    },
  }),
});
