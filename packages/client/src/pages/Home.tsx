import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import Tweet from '../components/feed/Tweet';
import WriteTweetFeed from '../components/feed/WriteTweet';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/profile.css';

export default function Home() {
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <WriteTweetFeed />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </MainColumn>
  );
}
