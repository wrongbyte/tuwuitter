import { graphql } from 'react-relay';

export const UnlikeTweet = graphql`
  mutation UnlikeTweetMutation($tweetId: ID!) {
    TweetUnlikeMutation(input: { tweetId: $tweetId }) {
      tweet {
        id
        likedByMe
        likedBy
      }
    }
  }
`;
