import '../styles/global.css';
import '../styles/login.css';
import LoginBar from '../components/LoginBar';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem('ACCESS_TOKEN');
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/home');
    }
  });
  return (
    <main className="login-page-main flex justify-center">
      <div className="content-login">
        <img className="login-white-logo" src="twitter-xxl.png" />
        <form>
          <input type="search" className="search" placeholder="Search Twitter" />
        </form>
        <p className="show-more-login">Show more</p>
      </div>
      <LoginBar />
    </main>
  );
}
