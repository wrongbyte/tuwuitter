import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { registerTypeLoader, nodeInterface } from '../../graphql/typeRegister';
import { connectionDefinitions, globalIdField } from 'graphql-relay';
import { Tweet } from './tweetModel';
import { load } from './TweetLoader';

export const TweetType = new GraphQLObjectType<Tweet>({
  name: 'Tweet',
  fields: () => ({
    id: globalIdField('Tweet'),
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
  interfaces: () => [nodeInterface],
});

registerTypeLoader(TweetType, load);

export const TweetConnection = connectionDefinitions({
  name: 'Tweet',
  nodeType: TweetType,
});
