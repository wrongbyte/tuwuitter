import '../../styles/global.css';
import '../../styles/profile.css';
import MainColumn from '../feed/MainColumn';
import LateralBar from '../feed/LateralBar';
import { useNavigate } from 'react-router-dom';
import Tweet from '../feed/Tweet';
import UserHeader from '../feed/Profile';
import UserTopBar from './UserTopBar';
import { useParams } from 'react-router-dom';

export default function UserPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  if (username?.length === 0) {
    navigate('/home');
  }

  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <UserTopBar />
        <UserHeader username={username as string} />
        <div className="profile-tweets-column">
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </div>
      </div>
    </MainColumn>
  );
}
