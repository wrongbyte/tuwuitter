import '../styles/global.css';
import '../styles/login.css';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

export default function LoginModal({
  setOpenLoginModal,
}: {
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="login-modal">
        <div className="login-wrapper">
          <div className="close-x" onClick={() => setOpenLoginModal(false)}>
            x
          </div>
          <img className="img-modal-login" src="twitter-xxl.png" alt="" />
          <p className="join-phrase-login">Sign in to Tuwuitter :3 </p>
          <form className="flex flex-col gap-10">
            <input type="text" className="login-input" placeholder="Username" />
            <input type="text" className="login-input" placeholder="Password" />
          </form>
          <button className="button-white-modal-login font-bold">Next</button>
          <button className="button-black-modal-login font-bold">
            Forgot password?
          </button>
          <p className="font-small-login">
            Don't have an account?{' '}
            <Link to="/register" className="highlight">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="modalBackground"></div>
    </>
  );
}
