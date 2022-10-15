import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { withFilter, connectionArgs } from '@entria/graphql-mongo-helpers';
import * as TweetLoader from '../../tweet/TweetLoader';
import { UserModel } from '../../user/userModel';
import { TweetConnection } from '../tweetType';

export const findTweetsFromUser: GraphQLFieldConfig<any, any, any> = {
  type: new GraphQLNonNull(TweetConnection.connectionType),
  args: {
    ...connectionArgs,
    username: { type: GraphQLString },
  },
  resolve: async (_, args, context) => {
    const user = await UserModel.findOne({ username: args.username });
    return await TweetLoader.loadAll(
      context,
      withFilter(args, { author: user._id })
    );
  },
};
