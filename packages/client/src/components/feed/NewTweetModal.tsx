import '../../styles/profile.css';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from 'react-relay';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { TweetCreateMutation } from '../../relay/tweet/__generated__/TweetCreateMutation.graphql';
import { object, string, TypeOf } from 'zod';
import { TweetCreate } from '../../relay/tweet/TweetCreateMutation';
import { zodResolver } from '@hookform/resolvers/zod';

const tweetSchema = object({
  content: string()
    .min(1, 'You cannot post an empty tweet.')
    .max(280, 'Maximum number of characters exceeded.'),
});
// todo: redirect if not logged in

type ITweet = TypeOf<typeof tweetSchema>;

const defaultValues: ITweet = {
  content: '',
};

export default function NewTweetModal({
  setOpenTweetModal,
}: {
  setOpenTweetModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [handleSubmitTweet] = useMutation<TweetCreateMutation>(TweetCreate);
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
          console.log(error);
          return;
        }
        setOpenTweetModal(false);
      },
    });
  };

  return (
    <>
      <div className="new-tweet-modal">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="close-x text-white" onClick={() => setOpenTweetModal(false)}>
            x
          </div>
          <div className="flex ml-4 mt-16 gap-5 ">
            <img src="default-pfp-tt.png" className="tweet-avatar"></img>
            <div className="tweet-input-wrapper">
              <textarea
                className="tweet-input"
                placeholder="What's happening?"
                {...register('content')}
              />
            </div>
          </div>
          <button type="submit" className="tweet-blue-button font-bold" value="Tweet">
            Tweet
          </button>
          {errors && (
            <span className="text-red-500 -mt-3 -mb-3 ml-4">{errors.content?.message}</span>
          )}
        </form>
      </div>
      <div className="modalBackground"></div>
    </>
  );
}
