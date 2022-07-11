import '../styles/global.css';
import '../styles/login.css';
import LoginBar from '../components/LoginBar';

export default function LoginPage() {
  return (
    <main className="login-page-main flex justify-center">
      <div className="content-login">
        <img className="login-white-logo" src="twitter-xxl.png" />
        <form>
          <input
            type="search"
            className="search"
            placeholder="Search Twitter"
          />
        </form>
        <p className="show-more-login">Show more</p>
      </div>
      <LoginBar />
    </main>
  );
}
