import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import '../styles/global.css';
import '../styles/login.css';
import LoginModal from './LoginModal';

export default function LoginBar() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal !== false && <LoginModal setOpenModal={setOpenModal} />}
      <div className="login-bar flex justify-between">
        <div className="text">
          <p className="bold-text-tt">Join the conversation on Twitter</p>
          <p>Log in to see what’s happening</p>
        </div>
        <div className="buttons">
          <button
            className="button-transparent"
            onClick={() => setOpenModal(true)}
          >
            Log in
          </button>
          <button className="button-white" onClick={() => setOpenModal(true)}>
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
