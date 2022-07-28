import LateralBar from '../components/feed/LateralBar';
import MainColumn from '../components/feed/MainColumn';
import '../styles/global.css';
import '../styles/home.css';
import UserTopBar from '../components/user/UserTopBar';

export default function UserPage() {
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <UserTopBar />
      </div>
    </MainColumn>
  );
}
