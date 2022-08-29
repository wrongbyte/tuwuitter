import '../../styles/global.css';
import '../../styles/login.css';
import '../../styles/home.css';
import '../../styles/profile.css';
import { ReactComponent as RepliesIcon } from '../../assets/replies.svg';
import { ReactComponent as RetweetsIcon } from '../../assets/retweets.svg';
import { ReactComponent as LikesIcon } from '../../assets/likes.svg';
import { ReactComponent as MoreIcon } from '../../assets/more-options-tweet.svg';
import { ReactComponent as ShareIcon } from '../../assets/share.svg';
import ProfilePicture from '../../assets/default-pfp-tt.png';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default function Tweet({
  content,
  displayName,
  username,
  createdAt,
}: {
  content: string;
  displayName: string | null;
  username: string;
  createdAt: string;
}) {
  return (
    <div className="tweet-wrapper">
      <img src={ProfilePicture} className="tweet-avatar"></img>
      <div className="tweet-content-column">
        <div className="flex justify-between">
          <div className="tweet-user-info-row flex gap-3">
            <Link to={`/user/${username}`}>
              <p className="text-white font-semibold">{displayName || ''}</p>
            </Link>
            <Link to={`/user/${username}`}>
              <p className="dark-gray">@{username}</p>
            </Link>
            <p className="dark-gray"> · {moment(createdAt).fromNow()}</p>
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
