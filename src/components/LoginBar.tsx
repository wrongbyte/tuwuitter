import '../styles/global.css';
import '../styles/login.css';

export default function LoginBar() {
  return (
    <div className="login-bar flex justify-between">
      <div className="text">
        <p className="bold-text-tt">Join the conversation on Twitter</p>
        <p>Log in to see what’s happening</p>
      </div>
      <div className="buttons">
        <button className="button-transparent">Log in</button>
        <button className="button-white">Sign up</button>
      </div>
    </div>
  );
}
