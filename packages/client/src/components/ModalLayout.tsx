import '../styles/global.css';

import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function ModalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="login-page-main flex justify-center">
      <div className="login-modal">
        <div className="login-wrapper">
          <div className="close-x">
            <Link to="/login">x</Link>
          </div>
          {children}
        </div>
      </div>
      <div className="modalBackground"></div>
    </main>
  );
}
