import { connectionUpdater } from '../mutationUtils';
import { graphql } from 'react-relay';
import { RecordSourceSelectorProxy, ROOT_ID } from 'relay-runtime';

export const tweetNewSubscription = graphql`
  subscription TweetNewSubscription($input: TweetNewInput!) {
    TweetNew(input: $input) {
      tweet {
        author {
          username
          displayName
        }
        content
        createdAt
        id
      }
    }
  }
`;

export const timelineSubscriptionUpdater = (store: RecordSourceSelectorProxy) => {
  const tweetEdge = store.getRootField('TweetNew')?.getLinkedRecord('tweet');
  const tweetId = tweetEdge?.getValue('id');
  const tweetStore = store.get(tweetId as string);

  if (!tweetStore) {
    connectionUpdater({
      store,
      parentId: ROOT_ID,
      connectionName: 'tweets_findTimelineTweets',
      edge: tweetEdge as any,
      before: true,
    });
  }
};
