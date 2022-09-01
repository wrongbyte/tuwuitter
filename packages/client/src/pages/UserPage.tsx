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

export default function UserPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  if (username?.length === 0) {
    navigate('/home');
  }

  // TODO: exhibit number of likes, retweets etc. (needs to be implemented.)
  const { findUserByUsername } = useLazyLoadQuery(
    graphql`
      query UserPageQuery($username: String!) {
        findUserByUsername(username: $username) {
          displayName
          username
          followers
          following
          id
          tweets(first: 100) {
            edges {
              node {
                content
                likedBy
                retweetedBy
                replies
                createdAt
              }
            }
          }
        }
      }
    `,
    { username: username },
    { fetchPolicy: 'store-or-network' }
  ) as UserPageQuery$data;

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
            {findUserByUsername?.tweets?.edges?.map((tweet: any) => {
              return (
                <Tweet
                  content={tweet.node.content}
                  displayName={findUserByUsername.displayName}
                  username={findUserByUsername.username}
                  createdAt={tweet.node.createdAt}
                />
              );
            })}
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
