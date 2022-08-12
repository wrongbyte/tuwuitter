import '../../styles/global.css';
import '../../styles/login.css';
import '../../styles/home.css';
import '../../styles/profile.css';
const { graphql, useLazyLoadQuery } = require('react-relay');

export default function UserHeader({ username }: { username: string }) {
  const { findUserByUsername } = useLazyLoadQuery(
    graphql`
      query ProfileUserQuery($username: String!) {
        findUserByUsername(username: $username) {
          displayName
          username
        }
      }
    `,
    { username: username }
  );

  return (
    <div className="user-header-info">
      <div className="user-profile-cover">
        <img className="user-image-cover" src="tt-header-test.png"></img>
      </div>
      <div className="flex justify-between">
        <img className="user-avatar-profile" src="default-pfp-tt.png"></img>
        <button className="edit-profile-button font-bold ">Editar perfil</button>
      </div>
      <div className="user-info-profile">
        {findUserByUsername ? (
          <>
            <p className="text-white font-bold text-xl">{findUserByUsername.displayName}</p>
            <p className="username">@{findUserByUsername.username}</p>
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
          </>
        ) : (
          <>
            <p className="username">@{username}</p>
            <p className="text-white text-5xl text-center font-bold">Essa conta não existe.</p>
          </>
        )}
      </div>
    </div>
  );
}
