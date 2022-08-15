import { graphql } from 'react-relay';

export const TweetCreate = graphql`
  mutation TweetCreateMutation($content: String!) {
    CreateTweetMutation(input: { content: $content }) {
      tweet {
        content
      }
    }
  }
`;
