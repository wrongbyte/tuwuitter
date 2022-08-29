import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { registerTypeLoader, nodeInterface } from '../../graphql/typeRegister';
import {
  connectionDefinitions,
  timestampResolver,
} from '@entria/graphql-mongo-helpers';
import { globalIdField } from 'graphql-relay';
import { Tweet } from './tweetModel';
import { load } from './TweetLoader';
import { UserType } from '../user/userType';
import * as UserLoader from '../user/UserLoader';
import { UserModel } from '../user/userModel';

export const TweetType = new GraphQLObjectType<Tweet>({
  name: 'Tweet',
  fields: () => ({
    id: globalIdField('Tweet'),
    author: {
      type: UserType,
      resolve: async (tweet, _, context) => {
        const user = await UserModel.findById(tweet.author);
        return await UserLoader.load(context, user._id);
      },
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
    ...timestampResolver,
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(TweetType, load);

export const TweetConnection = connectionDefinitions({
  name: 'Tweet',
  nodeType: TweetType,
});
