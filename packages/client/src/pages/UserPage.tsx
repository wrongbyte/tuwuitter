import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import { useNavigate } from 'react-router-dom';
import Tweet from '../components/feed/Tweet';
import UserHeader from '../components/feed/UserHeader';
import UserTopBar from '../components/user/UserTopBar';
import { useParams } from 'react-router-dom';
import NotFoundUser from '../components/user/NotFoundUser';
import type { UserPageQuery$data } from '../components/user/__generated__/UserPageQuery.graphql';
import { graphql, useLazyLoadQuery } from 'react-relay';
import Timeline from './Timeline';

const userPagePaginationFragment = graphql`
  fragment UserPageTweets on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 15 }
    after: { type: String }
    username: { type: String }
  )
  @refetchable(queryName: "findTweetsFromUser") {
    findTweetsFromUser(first: $first, after: $after, username: $username)
      @connection(key: "user_findTweetsFromUser", filters: []) {
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
        }
      }
    }
  }
`;

const userPageLazyLoadQuery = graphql`
  query UserPageQuery($username: String!) {
    ...UserPageTweets @arguments(username: $username)
  }
`;

export default function UserPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  if (username?.length === 0) {
    navigate('/home');
  }

  const { findUserByUsername } = useLazyLoadQuery(
    graphql`
      query UserPageHeaderQuery($username: String!) {
        findUserByUsername(username: $username) {
          username
          displayName
          followers
          following
          id
        }
      }
    `,
    { username: username }
  ) as any;

  return (
    <MainColumn>
      <LateralBar />
      <UserTopBar />
      {findUserByUsername ? (
        <div className="user-column">
          <UserHeader
            username={findUserByUsername.username as string}
            displayName={findUserByUsername.displayName as string}
            followingCount={findUserByUsername?.following?.length}
            followersCount={findUserByUsername?.followers?.length}
            userId={findUserByUsername.id}
          />
          <div className="profile-tweets-column">
            <Timeline
              paginationFragment={userPagePaginationFragment}
              lazyLoadQuery={userPageLazyLoadQuery}
              queryName="findTweetsFromUser"
              queryVariables={{ username: username }}
            />
          </div>
        </div>
      ) : (
        <div className="user-column">
          <NotFoundUser />
        </div>
      )}
    </MainColumn>
  );
}
