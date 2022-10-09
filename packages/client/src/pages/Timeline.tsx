import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { tweetNew, updater } from '../relay/tweet/TweetNewSubscription';
import InfiniteScroll from 'react-infinite-scroller';
import { graphql, usePaginationFragment, useSubscription, useLazyLoadQuery } from 'react-relay';
import Tweet from '../components/feed/Tweet';

export const useNewTweetSubscription = () => {
  const tweetNewConfig = useMemo<GraphQLSubscriptionConfig<any>>(
    () => ({
      subscription: tweetNew,
      variables: {
        input: {},
      },
      onCompleted: (...args) => {
        console.log('onCompleted: ', args);
      },
      onError: (...args) => {
        console.log('onError: ', args);
      },
      onNext: ({ TweetNew }: any) => {
        console.log(TweetNew);
        const { tweet } = TweetNew;
      },
      updater,
    }),
    []
  );

  useSubscription(tweetNewConfig);
};

export default function Timeline({
  paginationFragment,
  lazyLoadQuery,
  queryName,
}: {
  paginationFragment: any;
  lazyLoadQuery: any;
  queryName: string;
}) {
  // useNewTweetSubscription();
  const query = useLazyLoadQuery(lazyLoadQuery, {});

  const { data, loadNext, isLoadingNext } = usePaginationFragment<any, any>(
    paginationFragment,
    query
  );

  const loadMore = () => {
    if (isLoadingNext) {
      return;
    }
    loadNext(3);
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={data[queryName].pageInfo.hasNextPage}
      useWindow
    >
      {data?.[queryName].edges?.map((tweet: any) => {
        return (
          <Tweet
            key={tweet.node.id}
            content={tweet.node.content}
            displayName={tweet.node.author.displayName}
            username={tweet.node.author.username}
            createdAt={tweet.node.createdAt}
          />
        );
      })}
    </InfiniteScroll>
  );
}
