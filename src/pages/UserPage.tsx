import LateralBar from '../components/feed/LateralBar';
import MainColumn from '../components/feed/MainColumn';
import UserProfile from '../components/feed/Profile';
import UserTopBar from '../components/user/UserTopBar';
import '../styles/global.css';
import '../styles/home.css';

export default function UserPage() {
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <UserTopBar />
        <UserProfile />
      </div>
    </MainColumn>
  );
}
