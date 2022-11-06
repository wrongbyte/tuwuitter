import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import WriteTweetFeed from '../components/feed/WriteTweet';
import Timeline from './Timeline';
import { graphql, GraphQLSubscriptionConfig } from 'relay-runtime';
import { useMemo } from 'react';
import { useSubscription } from 'react-relay';
import {
  tweetNewSubscription,
  timelineSubscriptionUpdater,
} from '../relay/tweet/TweetNewSubscription';

const timelinePaginationFragment = graphql`
  fragment HomeTimelineTweetsTimeline on Query
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
          likedByMe
          likedBy
        }
      }
    }
  }
`;

const timelineLazyLoadQuery = graphql`
  query HomeTimelineQuery {
    ...HomeTimelineTweetsTimeline
    me {
      id
    }
  }
`;

export const useNewTweetSubscription = () => {
  const tweetNewConfig = useMemo<GraphQLSubscriptionConfig<any>>(
    () => ({
      subscription: tweetNewSubscription,
      variables: {
        input: {},
      },
      onCompleted: (...args) => {
        console.log('onCompleted: ', args);
      },
      onError: (...args) => {
        console.log('onError: ', args);
      },
      onNext: (a) => {
        console.log(a);
      },
      updater: timelineSubscriptionUpdater,
    }),
    []
  );

  useSubscription(tweetNewConfig);
};

export default function Home() {
  useNewTweetSubscription();
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <WriteTweetFeed />
        <Timeline
          paginationFragment={timelinePaginationFragment}
          lazyLoadQuery={timelineLazyLoadQuery}
          queryName="findTimelineTweets"
        />
      </div>
    </MainColumn>
  );
}
