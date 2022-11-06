import { graphql } from 'react-relay';

export const LikeTweetMutation = graphql`
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
