import '../styles/global.css';
import '../styles/home.css';
import '../styles/profile.css';
import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import WriteTweetFeed from '../components/feed/WriteTweet';
import { useState, useCallback } from 'react';
import Timeline from '../components/feed/Timeline';

export default function Home() {
  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState<any>(null);

  const refresh = useCallback(() => {
    setRefreshedQueryOptions((prev: any) => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: 'network-only',
    }));
  }, []);

  console.log(refreshedQueryOptions);
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <WriteTweetFeed refresh={refresh} />
        <Timeline queryOptions={refreshedQueryOptions ?? {}} />
      </div>
    </MainColumn>
  );
}
