import '../styles/global.css';
import '../styles/login.css';
import '../styles/home.css';
import '../styles/profile.css';
import '../styles/global.css';
import '../styles/login.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import ErrorModal from './ErrorModal';

export default function RegisterModal({
  setOpenRegisterModal,
}: {
  setOpenRegisterModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="login-modal">
        <div className="login-wrapper">
          <div className="close-x" onClick={() => setOpenRegisterModal(false)}>
            x
          </div>
          <img className="img-modal-login" src="twitter-xxl.png" alt="" />
          <p className="join-phrase-login">Join Tuwuitter today :3 </p>
          <form className="flex flex-col gap-6">
            <input type="search" className="login-input-register" placeholder="Name" />
            <input type="search" className="login-input-register" placeholder="Username" />
            <input type="search" className="login-input-register" placeholder="Email" />
            <input type="search" className="login-input-register" placeholder="Password" />
            <input
              type="submit"
              className="button-white-modal-login font-bold cursor-pointer self-center"
              value="Next"
            />
          </form>
        </div>
      </div>
      <div className="modalBackground"></div>
    </>
  );
}
