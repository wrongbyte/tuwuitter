import '../../styles/global.css';
import '../../styles/login.css';
import '../../styles/home.css';
import '../../styles/profile.css';
import { ReactComponent as RepliesIcon } from '../../assets/replies.svg';
import { ReactComponent as RetweetsIcon } from '../../assets/retweets.svg';
import { ReactComponent as LikesIcon } from '../../assets/likes.svg';
import { ReactComponent as MoreIcon } from '../../assets/more-options-tweet.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import { Link } from 'react-router-dom';

export default function Tweet({
  content,
  displayName,
  username,
}: {
  content: string;
  displayName: string;
  username: string;
}) {
  return (
    <div className="tweet-wrapper">
      <img src="default-pfp-tt.png" className="tweet-avatar"></img>
      <div className="tweet-content-column">
        <div className="flex justify-between">
          <div className="tweet-user-info-row flex gap-3">
            <Link to={`/user/${username}`}>
              <p className="text-white font-semibold">{displayName}</p>
            </Link>
            <Link to={`/user/${username}`}>
              <p className="dark-gray">@{username}</p>
            </Link>
            <p className="dark-gray"> · 1h</p>
          </div>
          <MoreIcon className="svg-smaller-gray cursor-pointer" />
        </div>

        <p className="text-white">{content}</p>
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
