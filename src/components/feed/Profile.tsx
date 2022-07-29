import '../../styles/profile.css';
export default function UserHeader() {
  return (
    <div className="user-header-info">
      <div className="user-profile-cover">
        <img className="user-image-cover" src="tt-header-test.png"></img>
      </div>
      <div className="flex justify-between">
        <img className="user-avatar-profile" src="default-pfp-tt.png"></img>
        <button className="edit-profile-button font-bold ">
          Editar perfil
        </button>
      </div>
      <div className="user-info-profile">
        <p className="text-white font-bold text-xl">Public Username</p>
        <p className="username">@username</p>
        <p className="text-white bio">404 bio not found</p>
        <div className="flex text-white gap-4">
          <span>
            <strong>0</strong> <span className="dark-gray">Seguindo</span>
          </span>
          <span>
            <strong>0</strong> <span className="dark-gray">Seguindo</span>
          </span>
        </div>
        <nav className="flex justify-around nav-user font-semibold">
          <div className="nav-user-active">Tweets</div>
          <div className="nav-user-inactive">Tweets e respostas</div>
          <div className="nav-user-inactive">Mídia</div>
          <div className="nav-user-inactive">Curtidas</div>
        </nav>
      </div>
    </div>
  );
}
