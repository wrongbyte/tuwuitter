import ModalLayout from '../ModalLayout';

export default function SetPasswordModal() {
  return (
    <ModalLayout>
      <p className="step-modal">Step 2 of 2 </p>
      <p className="create-account">You'll need a password </p>
      <p className="font-small-login adjust-login-title">
        Make sure it's 8 characters or more.
      </p>
      <form>
        {/* TODO: add button to hide or view password */}
        <input
          type="password"
          className="login-input-register"
          placeholder="Password"
        />
      </form>
      <button className="next-button-step1 font-bold">Next</button>
    </ModalLayout>
  );
}
