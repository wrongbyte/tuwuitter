import '../styles/global.css';
import '../styles/login.css';
import { Dispatch, SetStateAction } from 'react';

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
          <button className="button-white-modal-login">
            Sign up with Google
          </button>
          <button className="button-white-modal-login font-bold">
            Sign up with Apple
          </button>
          <p className="or-text">or</p>
          <form>
            <input
              type="search"
              className="login-input"
              placeholder="Phone, email, or username"
            />
          </form>
          <button className="button-white-modal-login font-bold">Next</button>
          <button className="button-black-modal-login font-bold">
            Forgot password?
          </button>
          <p className="font-small-login">
            Don't have an account? <span className="highlight">Sign up</span>
          </p>
        </div>
      </div>
      <div className="modalBackground"></div>
    </>
  );
}
