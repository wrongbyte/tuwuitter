import { graphql } from 'react-relay';
import { SelectorStoreUpdater, ROOT_ID } from 'relay-runtime';
import { connectionUpdater } from '../mutationUtils';

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
