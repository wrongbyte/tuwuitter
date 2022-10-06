import { useMemo } from 'react';
import { GraphQLSubscriptionConfig } from 'relay-runtime';
import { useSubscription } from 'react-relay';
import { tweetNew, updater } from '../relay/tweet/TweetNewSubscription';

export const useNewTweetSubscription = () => {
  const tweetNewConfig = useMemo<GraphQLSubscriptionConfig<any>>(
    () => ({
      subscription: tweetNew,
      variables: {
        input: {},
      },
      onCompleted: (...args) => {
        console.log('onCompleted: ', args);
      },
      onError: (...args) => {
        console.log('onError: ', args);
      },
      onNext: ({ TweetNew }: any) => {
        console.log(TweetNew);
        const { tweet } = TweetNew;
      },
      updater,
    }),
    []
  );

  useSubscription(tweetNewConfig);
};

export default function Test() {
  useNewTweetSubscription();

  return <h1 className="text-white">aaaaaaaaaaaaaaaaaaaaaaaaaaa</h1>;
}
