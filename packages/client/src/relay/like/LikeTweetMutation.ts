import { graphql } from 'react-relay';

export const LikeTweet = graphql`
  mutation LikeTweetMutation($tweetId: ID!) {
    TweetLikeMutation(input: { tweetId: $tweetId }) {
      tweet {
        id
        likedByMe
        likedBy
      }
    }
  }
`;
