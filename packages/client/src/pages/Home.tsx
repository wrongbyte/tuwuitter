import LateralBar from '../components/feed/LateralBar';
import MainColumn from '../components/feed/MainColumn';
import '../styles/global.css';
import '../styles/home.css';

export default function Home() {
  return (
    <MainColumn>
      <LateralBar />
    </MainColumn>
  );
}
