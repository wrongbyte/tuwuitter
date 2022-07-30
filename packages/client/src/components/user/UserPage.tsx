import LateralBar from '../feed/LateralBar';
import MainColumn from '../feed/MainColumn';
import UserHeader from '../feed/Profile';
import UserTopBar from './UserTopBar';
import '../../styles/global.css';
import '../../styles/home.css';
import Tweet from '../feed/Tweet';

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
