import { connectionUpdater } from '../mutationUtils';
import { graphql } from 'react-relay';
import { ConnectionHandler, RecordSourceSelectorProxy, ROOT_ID } from 'relay-runtime';

export const tweetNew = graphql`
  subscription TweetNewSubscription($input: TweetNewInput!) {
    TweetNew(input: $input) {
      tweet {
        content
      }
    }
  }
`;

export const updater = (store: RecordSourceSelectorProxy) => {
  const tweetNode = store?.getRootField('TweetNew')?.getLinkedRecord('tweet');

  const tweetId = tweetNode?.getValue('id');

  const tweetStore = store.get(tweetId as string);

  if (!tweetStore) {
    const tweetConnection = ConnectionHandler.getConnection(store.getRoot(), 'Timeline_tweets');
    const tweetEdge = ConnectionHandler.createEdge(
      store,
      tweetConnection as any,
      tweetNode as any,
      'tweetEdge'
    );

    connectionUpdater({
      store,
      parentId: ROOT_ID,
      connectionName: 'tweets_findTimelineTweets',
      edge: tweetEdge,
      before: true,
    });
  }
};
