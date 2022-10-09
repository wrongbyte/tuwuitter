import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription, useLazyLoadQuery } from 'react-relay';
import { tweetNew, updater } from '../relay/tweet/TweetNewSubscription';
import InfiniteScroll from 'react-infinite-scroller';
import { graphql, usePaginationFragment } from 'react-relay';
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

export default function Timeline() {
  useNewTweetSubscription();
  const query = useLazyLoadQuery(
    graphql`
      query TimelineQuery {
        ...TimelineTweetsTimeline
        me {
          id
        }
      }
    `,
    {}
  );

  const { data, loadNext, isLoadingNext } = usePaginationFragment<any, any>(
    graphql`
      fragment TimelineTweetsTimeline on Query
      @argumentDefinitions(first: { type: Int, defaultValue: 15 }, after: { type: String })
      @refetchable(queryName: "TimelineTweetListPaginationQuery") {
        findTimelineTweets(first: $first, after: $after)
          @connection(key: "tweets_findTimelineTweets", filters: []) {
          endCursorOffset
          startCursorOffset
          count
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
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
      }
    `,
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
      hasMore={data.findTimelineTweets.pageInfo.hasNextPage}
      useWindow
    >
      {data?.findTimelineTweets.edges?.map((tweet: any) => {
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
