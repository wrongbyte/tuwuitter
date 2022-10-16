import { ReactComponent as HomeIcon } from '../../assets/home.svg';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import { ReactComponent as NotificationsIcon } from '../../assets/notifications.svg';
import { ReactComponent as MessagesIcon } from '../../assets/messages.svg';
import { ReactComponent as SavedItemsIcon } from '../../assets/saved.svg';
import { ReactComponent as ListsIcon } from '../../assets/lists.svg';
import { ReactComponent as UserProfileIcon } from '../../assets/profile.svg';
import { ReactComponent as GithubIcon } from '../../assets/github-icon2.svg';
import { ReactComponent as WriteTweetIcon } from '../../assets/writetweet.svg';
import type { LateralBarQuery$data } from './__generated__/LateralBarQuery.graphql';
import TwitterIcon from '../../assets/twitter-xxl.png';
import { Link } from 'react-router-dom';
import NewTweetModal from './NewTweetModal';
import '../../styles/global.css';
import '../../styles/home.css';
import '../../styles/profile.css';
import { useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';

export default function LateralBar() {
  const [openNewTweetModal, setOpenTweetModal] = useState(false);
  const { me } = useLazyLoadQuery(
    graphql`
      query LateralBarQuery {
        me {
          username
        }
      }
    `,
    {},
    { fetchPolicy: 'store-or-network' }
  ) as LateralBarQuery$data;

  return (
    <>
      {openNewTweetModal !== false && <NewTweetModal setOpenTweetModal={setOpenTweetModal} />}
      <aside className="lateralbar-wrapper">
        <div className="lateralbar-icons">
          <img className="twitter-icon-lateralbar" src={TwitterIcon} alt="twitter icon"></img>

          <Link to="/home">
            <HomeIcon className="svg-small" />
          </Link>
          <SearchIcon className="svg-small" />
          <NotificationsIcon className="svg-small" />
          <MessagesIcon className="svg-small" />
          <SavedItemsIcon className="svg-small" />
          <ListsIcon className="svg-small" />
          <Link to={`/user/${me?.username}`}>
            <UserProfileIcon className="svg-small" />
          </Link>
          <a href="https://github.com/wrongbyte/tuwuitter">
            <GithubIcon className="svg-small-github" />
          </a>
          <div className="blue-circle cursor-pointer">
            <WriteTweetIcon className="svg-small" onClick={() => setOpenTweetModal(true)} />
          </div>
        </div>
      </aside>
    </>
  );
}
