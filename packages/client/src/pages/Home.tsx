import '../styles/global.css';
import '../styles/home.css';
import '../styles/profile.css';
import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import WriteTweetFeed from '../components/feed/WriteTweet';
import Timeline from './Timeline';
import { graphql } from 'relay-runtime';

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

export default function Home() {
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
