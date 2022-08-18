import { Link } from 'react-router-dom';
import { Dispatch, SetStateAction } from 'react';

export default function ErrorModal({
  phrase,
  setErrorStatus,
}: {
  phrase: string;
  setErrorStatus: Dispatch<SetStateAction<boolean | string>>;
}) {
  return (
    <main className="login-page-main flex justify-center z-50">
      <div className="login-modal">
        <div className="error-modal">
          <div className="close-x" onClick={() => setErrorStatus(false)}>
            x
          </div>
          <p>{phrase}</p>
        </div>
      </div>
      <div className="modalBackground"></div>
    </main>
  );
}
