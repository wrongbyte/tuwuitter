import { TweetModel, Tweet } from './tweetModel';

export const findTweetById = async ({
  id,
}: {
  id: string;
}): Promise<Tweet | undefined> => {
  return await TweetModel.findById(id);
};
