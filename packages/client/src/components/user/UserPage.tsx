import '../../styles/global.css';
import '../../styles/profile.css';
import MainColumn from '../feed/MainColumn';
import LateralBar from '../feed/LateralBar';
import Tweet from '../feed/Tweet';
import UserHeader from '../feed/Profile';
import UserTopBar from './UserTopBar';

export default function UserPage() {
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <UserTopBar />
        <UserHeader />
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
