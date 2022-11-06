import { connectionUpdater } from '../mutationUtils';
import { graphql } from 'react-relay';
import { RecordSourceSelectorProxy, ROOT_ID } from 'relay-runtime';

export const tweetNewSubscription = graphql`
  subscription TweetNewSubscription($input: TweetNewInput!) {
    TweetNew(input: $input) {
      tweet {
        node {
          author {
            username
            displayName
          }
          content
          createdAt
          id
          likedBy
          likedByMe
        }
      }
    }
  }
`;

export const timelineSubscriptionUpdater = (store: RecordSourceSelectorProxy) => {
  const tweetEdge = store.getRootField('TweetNew')?.getLinkedRecord('tweet');
  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: 'tweets_findTimelineTweets',
    edge: tweetEdge as any,
    before: true,
  });
};
