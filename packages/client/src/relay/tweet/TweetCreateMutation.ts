import { graphql } from 'react-relay';

export const TweetCreate = graphql`
  mutation TweetCreateMutation($content: String!) {
    CreateTweetMutation(input: { content: $content }) {
      tweet {
        node {
          author {
            username
            displayName
          }
          content
          createdAt
        }
      }
    }
  }
`;
