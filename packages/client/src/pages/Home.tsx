import '../styles/global.css';
import '../styles/home.css';
import '../styles/profile.css';
import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import WriteTweetFeed from '../components/feed/WriteTweet';
import { PreloadedQuery } from 'react-relay';
import Timeline from './Timeline';

type Props = {
  prepared: {
    timelineQuery: PreloadedQuery<any>;
  };
};

export default function Home() {
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <WriteTweetFeed />
        <Timeline />
      </div>
    </MainColumn>
  );
}
