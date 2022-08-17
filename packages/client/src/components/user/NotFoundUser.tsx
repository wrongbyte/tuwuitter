import '../../styles/global.css';
import '../../styles/home.css';
import '../../styles/profile.css';

export default function NotFoundUser() {
  return (
    <>
      <div className="user-header-info">
        <div className="user-profile-cover">
          <img className="user-image-cover" src="tt-header-test.png"></img>
        </div>
        <div className="flex justify-between">
          <img className="user-avatar-profile" src="default-pfp-tt.png"></img>
        </div>
        <div className="user-info-profile">
          <p className="text-white text-5xl text-center font-bold">Essa conta não existe.</p>
        </div>
      </div>
      <div className="profile-tweets-column"></div>
    </>
  );
}
