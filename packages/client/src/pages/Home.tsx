import '../styles/global.css';
import '../styles/home.css';
import '../styles/profile.css';
import MainColumn from '../components/feed/MainColumn';
import LateralBar from '../components/feed/LateralBar';
import Tweet from '../components/feed/Tweet';
import WriteTweetFeed from '../components/feed/WriteTweet';

const { graphql, useLazyLoadQuery } = require('react-relay');

export default function Home() {
  const { findTimelineTweets } = useLazyLoadQuery(graphql`
    query HomeTweetsQuery {
      findTimelineTweets {
        edges {
          node {
            author {
              username
              displayName
            }
            content
          }
        }
      }
    }
  `);
  return (
    <MainColumn>
      <LateralBar />
      <div className="user-column">
        <WriteTweetFeed />
        {findTimelineTweets.edges.map((tweet: any) => {
          return (
            <Tweet
              content={tweet.node.content}
              displayName={tweet.node.author.displayName}
              username={tweet.node.author.username}
            />
          );
        })}
      </div>
    </MainColumn>
  );
}
