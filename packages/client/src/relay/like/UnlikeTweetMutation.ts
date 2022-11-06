import { graphql } from 'react-relay';

export const UnlikeTweetMutation = graphql`
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
