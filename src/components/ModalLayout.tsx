import { ReactNode } from 'react';

export default function ModalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="login-page-main flex justify-center">
        <div className="login-modal">
          <div className="login-wrapper">
            <div className="close-x">x</div>
            {children}
          </div>
        </div>
        <div className="modalBackground"></div>
      </main>
    </>
  );
}
