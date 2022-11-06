import { ReactComponent as LikesIcon } from '../../assets/likes.svg';
import { ReactComponent as LikedIcon } from '../../assets/liked.svg';
import { LikeTweet } from '../../relay/like/LikeTweetMutation';
import { UnlikeTweet } from '../../relay/like/UnlikeTweetMutation';
import { useMutation } from 'react-relay';
import ErrorModal from '../ErrorModal';
import { useState } from 'react';
import type { LikeTweetMutation } from '../../relay/like/__generated__/LikeTweetMutation.graphql';
import type { UnlikeTweetMutation } from '../../relay/like/__generated__/UnlikeTweetMutation.graphql';

export default function LikeButton({
  tweetId,
  likedBy,
  likedByMe,
}: {
  tweetId: string;
  likedBy: number;
  likedByMe: boolean;
}) {
  const [errorStatus, setErrorStatus] = useState<boolean | string>(false);
  const [handleLikeTweet] = useMutation<LikeTweetMutation>(LikeTweet);
  const [handleUnlikeTweet] = useMutation<UnlikeTweetMutation>(UnlikeTweet);

  const likeTweet = (tweetId: string) => {
    return handleLikeTweet({
      variables: { tweetId },
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          const errorMessage = error[0].message || 'Unknown error';
          return setErrorStatus(`Error when liking tweet: ${errorMessage}`);
        }
      },
    });
  };

  const unlikeTweet = (tweetId: string) => {
    return handleUnlikeTweet({
      variables: { tweetId },
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          const errorMessage = error[0].message || 'Unknown error';
          return setErrorStatus(`Error when unliking tweet: ${errorMessage}`);
        }
      },
    });
  };

  return (
    <>
      {errorStatus && <ErrorModal phrase={errorStatus as string} setErrorStatus={setErrorStatus} />}
      <div className="flex gap-2 text-white">
        {likedByMe ? (
          <>
            <LikedIcon
              className="svg-smaller-no-color cursor-pointer"
              onClick={() => unlikeTweet(tweetId)}
            />
            <span style={{ color: '#f91880' }}>{`${likedBy}`}</span>
          </>
        ) : (
          <>
            <LikesIcon
              className="svg-smaller-gray cursor-pointer"
              onClick={() => likeTweet(tweetId)}
            />
            <span>{`${likedBy}`}</span>
          </>
        )}
      </div>
    </>
  );
}
