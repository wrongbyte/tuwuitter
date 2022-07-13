import { useState } from 'react';
import '../styles/global.css';
import '../styles/login.css';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

export default function LoginBar() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  return (
    <>
      {openRegisterModal !== false && (
        <RegisterModal setOpenRegisterModal={setOpenRegisterModal} />
      )}
      {openLoginModal !== false && (
        <LoginModal setOpenLoginModal={setOpenLoginModal} />
      )}
      <div className="login-bar flex justify-between">
        <div className="text">
          <p className="bold-text-tt">Join the conversation on Twitter</p>
          <p>Log in to see what’s happening</p>
        </div>
        <div className="buttons">
          <button
            className="button-transparent"
            onClick={() => setOpenLoginModal(true)}
          >
            Log in
          </button>
          <button
            className="button-white"
            onClick={() => setOpenRegisterModal(true)}
          >
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
