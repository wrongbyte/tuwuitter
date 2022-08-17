import '../../styles/global.css';
import '../../styles/profile.css';
import MainColumn from '../feed/MainColumn';
import LateralBar from '../feed/LateralBar';
import { useNavigate } from 'react-router-dom';
import Tweet from '../feed/Tweet';
import UserHeader from '../feed/Profile';
import UserTopBar from './UserTopBar';
import { useParams } from 'react-router-dom';
import NotFoundUser from './NotFoundUser';
const { graphql, useLazyLoadQuery } = require('react-relay');

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
          tweets {
            edges {
              node {
                content
                likedBy
                retweetedBy
                replies
              }
            }
          }
        }
      }
    `,
    { username: username }
  );

  return (
    <MainColumn>
      <LateralBar />
      <UserTopBar />
      {findUserByUsername ? (
        <div className="user-column">
          <UserHeader
            username={findUserByUsername.username as string}
            displayName={findUserByUsername.displayName as string}
            followingCount={findUserByUsername.following.length}
            followersCount={findUserByUsername.followers.length}
            userId={findUserByUsername.id}
          />
          <div className="profile-tweets-column">
            {findUserByUsername.tweets.edges.map((tweet: any) => {
              return (
                <Tweet
                  content={tweet.node.content}
                  displayName={findUserByUsername.displayName}
                  username={findUserByUsername.username}
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
