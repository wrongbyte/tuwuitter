import '../../styles/global.css';
import { ReactComponent as RepliesIcon } from '../../assets/replies.svg';
import { ReactComponent as RetweetsIcon } from '../../assets/retweets.svg';
import { ReactComponent as LikesIcon } from '../../assets/likes.svg';
import { ReactComponent as MoreIcon } from '../../assets/more-options-tweet.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';

export default function Tweet() {
  return (
    <div className="tweet-wrapper">
      <img src="default-pfp-tt.png" className="tweet-avatar"></img>
      <div className="tweet-content-column">
        <div className="flex justify-between">
          <div className="tweet-user-info-row flex gap-3">
            <p className="text-white font-semibold">Public Username</p>
            <p className="dark-gray">@username</p>
            <p className="dark-gray"> · 1h</p>
          </div>
          <MoreIcon className="svg-smaller-gray cursor-pointer" />
        </div>

        <p className="text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in volupt
        </p>
        <div className="flex justify-evenly mt-3 -ml-10">
          <RepliesIcon className="svg-smaller-gray cursor-pointer" />
          <RetweetsIcon className="svg-smaller-gray cursor-pointer" />
          <LikesIcon className="svg-smaller-gray cursor-pointer" />
          <ShareIcon className="svg-smaller-gray cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
