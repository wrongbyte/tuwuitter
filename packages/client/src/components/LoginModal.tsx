import '../styles/global.css';
import '../styles/login.css';
import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';

const loginSchema = object({
  username: string().min(1, 'Provide your username'),
  password: string()
    .min(1, 'Provide your password')
    .max(32, 'Password must be less than 32 characters'),
});

type ILogin = TypeOf<typeof loginSchema>;

export default function LoginModal({
  setOpenLoginModal,
}: {
  setOpenLoginModal: Dispatch<SetStateAction<boolean>>;
}) {
  const defaultValues: ILogin = {
    username: '',
    password: '',
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmitHandler: SubmitHandler<ILogin> = (values: ILogin) => {
    console.log(values);
  };
  return (
    <>
      <div className="login-modal">
        <div className="login-wrapper">
          <div className="close-x" onClick={() => setOpenLoginModal(false)}>
            x
          </div>
          <img className="img-modal-login" src="twitter-xxl.png" alt="" />
          <p className="join-phrase-login">Sign in to Tuwuitter :3 </p>

          <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmitHandler)}>
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              {...register('username')}
            />
            {errors && (
              <span className="text-red-500 -mt-3 -mb-3 text-center">
                {errors.username?.message}
              </span>
            )}
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              {...register('password')}
            />
            {errors && (
              <span className="text-red-500 -mt-3 -mb-3 text-center">
                {errors.password?.message}
              </span>
            )}
            <input
              type="submit"
              className="button-white-modal-login font-bold cursor-pointer"
              value="Next"
            />
          </form>

          <button className="button-black-modal-login font-bold">Forgot password?</button>
          <p className="font-small-login">
            Don't have an account?{' '}
            <Link to="/register" className="highlight">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="modalBackground"></div>
    </>
  );
}
