import InfiniteScroll from 'react-infinite-scroller';
import { usePaginationFragment, useLazyLoadQuery } from 'react-relay';
import Tweet from '../components/feed/Tweet';

export default function Timeline({
  paginationFragment,
  lazyLoadQuery,
  queryName,
  queryVariables,
}: {
  paginationFragment: any;
  lazyLoadQuery: any;
  queryName: string;
  queryVariables?: any;
}) {
  const query = useLazyLoadQuery(lazyLoadQuery, queryVariables);

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
            tweetId={tweet.node.id}
            content={tweet.node.content}
            displayName={tweet.node.author.displayName}
            username={tweet.node.author.username}
            createdAt={tweet.node.createdAt}
            likedBy={tweet.node.likedBy}
            likedByMe={tweet.node.likedByMe}
          />
        );
      })}
    </InfiniteScroll>
  );
}
