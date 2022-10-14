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

export const newTweetUpdater: SelectorStoreUpdater = (store) => {
  // get or create

  const newEdge = store.getRootField('CreateTweetMutation')?.getLinkedRecord('tweet');
  const tweetId = newEdge?.getValue('id');
  console.log(tweetId);
  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'tweets_findTimelineTweets',
    edge: newEdge as any,
    before: true,
  });
};
