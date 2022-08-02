import '../../styles/global.css';
import '../../styles/login.css';
import '../../styles/home.css';
import '../../styles/profile.css';
import { ReactComponent as BackIcon } from '../../assets/back.svg';

export default function UserTopBar() {
  return (
    <div className="user-top-navbar">
      <BackIcon className="svg-smaller" />
      <div className="flex flex-col">
        <p className="font-semibold text-white text-2xl user-profile-username">user</p>
        <p className="number-tweets font-semibold">0 Tweets</p>
      </div>
    </div>
  );
}
