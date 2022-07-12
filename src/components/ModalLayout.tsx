export default function ModalLayout() {
  return (
    <>
      <main className="login-page-main flex justify-center">
        <div className="login-modal">
          <div className="login-wrapper">
            <div className="close-x">x</div>
            <p className="step-modal">Step 1 of 5 </p>
            <p className="create-account">Create your account</p>
            <form>
              <input
                type="search"
                className="login-input-register"
                placeholder="Name"
              />
            </form>
            <form>
              <input
                type="search"
                className="login-input-register"
                placeholder="Phone"
              />
            </form>
          </div>
        </div>
        <div className="modalBackground"></div>
      </main>
    </>
  );
}
