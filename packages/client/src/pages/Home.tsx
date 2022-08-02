import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import '../styles/global.css';
import '../styles/login.css';
import '../styles/home.css';
import '../styles/profile.css';

export default function Home() {
  return (
    <MainColumn>
      <LateralBar />
    </MainColumn>
  );
}
