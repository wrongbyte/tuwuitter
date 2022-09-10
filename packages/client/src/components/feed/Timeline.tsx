import Tweet from './Tweet';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { TimelineTweetsQuery$data } from './__generated__/TimelineTweetsQuery.graphql';

export default function Timeline({ queryOptions }: { queryOptions: any }) {
  const { findTimelineTweets } = useLazyLoadQuery(
    graphql`
      query TimelineTweetsQuery {
        findTimelineTweets(first: 100) {
          edges {
            node {
              author {
                username
                displayName
              }
              content
              createdAt
            }
          }
        }
      }
    `,
    {},
    queryOptions
  ) as TimelineTweetsQuery$data;
  return (
    <>
      {findTimelineTweets?.edges?.map((tweet: any) => {
        return (
          <Tweet
            content={tweet.node.content}
            displayName={tweet.node.author.displayName}
            username={tweet.node.author.username}
            createdAt={tweet.node.createdAt}
            key={tweet.node.createdAt}
          />
        );
      })}
    </>
  );
}
