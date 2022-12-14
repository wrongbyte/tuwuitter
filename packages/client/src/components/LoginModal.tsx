import '../styles/global.css';
import '../styles/login.css';
import { Dispatch, SetStateAction } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { object, string, TypeOf } from 'zod';
import { useMutation } from 'react-relay';
import { UserLogin } from '../relay/user/UserLoginMutation';
import type { UserLoginMutation } from '../relay/user/__generated__/UserLoginMutation.graphql';
import { useAuth } from '../auth/AuthContext';
import ErrorModal from './ErrorModal';
import { useState } from 'react';
import TwitterIcon from '../assets/twitter-xxl.png';

const loginSchema = object({
  username: string()
    .min(1, 'Provide your username')
    .max(12, 'Username must be less than 12 characters'),
  password: string()
    .min(8, 'Password must be more than 8 characters')
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
  const [handleUserLogin] = useMutation<UserLoginMutation>(UserLogin);
  const [errorStatus, setErrorStatus] = useState<boolean | string>(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<ILogin> = async (values: ILogin) => {
    handleUserLogin({
      variables: values,
      onCompleted: ({ userLoginMutation }, error) => {
        if (error && error.length > 0) {
          const errorMessage = error[0].message || 'Unknown error';
          return setErrorStatus(`Error: ${errorMessage}`);
        }
        loginUser(userLoginMutation?.token as string);
        navigate(`/user/${userLoginMutation?.me?.username}`);
      },
    });
  };
  return (
    <>
      {errorStatus && <ErrorModal phrase={errorStatus as string} setErrorStatus={setErrorStatus} />}
      <div className="login-modal">
        <div className="login-wrapper">
          <div className="close-x" onClick={() => setOpenLoginModal(false)}>
            x
          </div>
          <img className="img-modal-login" src={TwitterIcon} alt="" />
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
