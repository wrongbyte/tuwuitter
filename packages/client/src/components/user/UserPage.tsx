import '../../styles/global.css';
import '../../styles/profile.css';
import MainColumn from '../feed/MainColumn';
import LateralBar from '../feed/LateralBar';
import Tweet from '../feed/Tweet';
import UserHeader from '../feed/Profile';
import UserTopBar from './UserTopBar';
import { useParams } from 'react-router-dom';
const { graphql, useLazyLoadQuery } = require('react-relay');

export default function UserPage() {
  const userId = useParams();
  const data = useLazyLoadQuery(
    graphql`
      query UserPageQuery($id: ID!) {
        node(id: $id) {
          id
          ... on User {
            username
            displayName
          }
        }
      }
    `,
    { id: 'VXNlcjo2MmRmM2UyZDE3ODc2YWI0MjdlNmJlMmY=' }
  );

  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <UserTopBar />
        <UserHeader />
        <div className="profile-tweets-column">
          <h1 className="text-white">{data.node?.username}</h1>
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </div>
      </div>
    </MainColumn>
  );
}
