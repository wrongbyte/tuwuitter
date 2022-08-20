import { useMutation } from 'react-relay';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { TweetCreateMutation } from '../../relay/tweet/__generated__/TweetCreateMutation.graphql';
import { object, string, TypeOf } from 'zod';
import { TweetCreate } from '../../relay/tweet/TweetCreateMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import ErrorModal from '../ErrorModal';

const tweetSchema = object({
  content: string()
    .min(1, 'You cannot post an empty tweet.')
    .max(280, 'Maximum number of characters exceeded.'),
});

type ITweet = TypeOf<typeof tweetSchema>;

const defaultValues: ITweet = {
  content: '',
};

export default function WriteTweetFeed() {
  const [handleSubmitTweet] = useMutation<TweetCreateMutation>(TweetCreate);
  const [errorStatus, setErrorStatus] = useState<boolean | string>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ITweet>({
    resolver: zodResolver(tweetSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ITweet> = async (values: ITweet) => {
    handleSubmitTweet({
      variables: values,
      onCompleted: (_, error) => {
        if (error && error.length > 0) {
          const errorMessage = error[0].message || 'Unknown error';
          return setErrorStatus(`Error when posting tweet: ${errorMessage}`);
        }
        window.location.reload();
      },
    });
  };
  return (
    <>
      {errorStatus && <ErrorModal phrase={errorStatus as string} setErrorStatus={setErrorStatus} />}
      <div className="tweet-wrapper">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex ml-4 mt-16 gap-5 ">
            <img src="default-pfp-tt.png" className="tweet-avatar"></img>
            <div className="tweet-input-wrapper-timeline">
              <textarea
                {...register('content')}
                className="tweet-input"
                placeholder="What's happening?"
              />
            </div>
          </div>
          <button className="tweet-blue-button font-bold">Tweet</button>
          {errors && (
            <span className="text-red-500 -mt-3 -mb-3 ml-4">{errors.content?.message}</span>
          )}
        </form>
      </div>
    </>
  );
}
