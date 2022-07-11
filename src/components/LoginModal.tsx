import '../styles/global.css';
import '../styles/login.css';

export default function LoginModal() {
  return (
    <div className="login-modal">
      <div className="login-wrapper">
        <div className="close-x">x</div>
        <img className="img-modal-login" src="twitter-xxl.png" alt="" />
        <p className="join-phrase-login">Join Tuwuitter today :3 </p>
        <button className="button-white-modal-login">
          Sign up with Google
        </button>
        <button className="button-white-modal-login font-bold">
          Sign up with Apple
        </button>
        <p className="or-text">or</p>
        <button className="button-white-modal-login font-bold">
          Sign up with phone or email
        </button>

        <p className="policy">
          By signing up, you agree to the{' '}
          <span className="highlight">Terms of Service</span> and{' '}
          <span className="highlight">Privacy Policy</span>, including{' '}
          <span className="highlight">Cookie Use</span>.
        </p>
        <p className="policy">
          Have an account already? <span className="highlight">Log in</span>
        </p>
      </div>
    </div>
  );
}
