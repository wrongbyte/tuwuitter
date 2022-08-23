import '../styles/global.css';
import '../styles/login.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-relay';
import { UserCreate } from '../relay/user/UserCreateMutation';
import type { UserCreateMutation } from '../relay/user/__generated__/UserCreateMutation.graphql';
import ErrorModal from './ErrorModal';
import { useAuth } from '../auth/AuthContext';
import { object, string, TypeOf } from 'zod';
import TwitterIcon from '../assets/twitter-xxl.png';

const registerSchema = object({
  username: string()
    .min(1, 'Provide your username')
    .max(12, 'Username must be less than 12 characters'),
  displayName: string().max(60, 'Name must be less than 60 characters'),
  email: string().min(1, 'Provide your email').max(60, 'Email must be less than 60 characters'),
  password: string()
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

type IRegister = TypeOf<typeof registerSchema>;

export default function RegisterModal({
  setOpenRegisterModal,
}: {
  setOpenRegisterModal: Dispatch<SetStateAction<boolean>>;
}) {
  const defaultValues: IRegister = {
    username: '',
    displayName: '',
    email: '',
    password: '',
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const [handleUserRegister] = useMutation<UserCreateMutation>(UserCreate);
  const [errorStatus, setErrorStatus] = useState<boolean | string>(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const onSubmitHandler: SubmitHandler<IRegister> = async (values: IRegister) => {
    handleUserRegister({
      variables: values,
      onCompleted: ({ CreateUserMutation }, error) => {
        if (error && error.length > 0) {
          const errorMessage = error[0].message || 'Unknown error';
          return setErrorStatus(`Error when creating account: ${errorMessage}`);
        }
        loginUser(CreateUserMutation?.token as string);
        navigate(`/home`);
      },
    });
  };

  return (
    <>
      {errorStatus && <ErrorModal phrase={errorStatus as string} setErrorStatus={setErrorStatus} />}
      <div className="login-modal">
        <div className="login-wrapper">
          <div className="close-x" onClick={() => setOpenRegisterModal(false)}>
            x
          </div>
          <img className="img-modal-login" src={TwitterIcon} alt="twitter icon" />
          <p className="join-phrase-login">Join Tuwuitter today :3 </p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmitHandler)}>
            <input
              type="text"
              className="login-input-register"
              placeholder="Name"
              {...register('displayName')}
            />
            {errors && (
              <span className="text-red-500 -mt-3 -mb-3 text-center">
                {errors.displayName?.message}
              </span>
            )}
            <input
              type="text"
              className="login-input-register"
              placeholder="Username"
              {...register('username')}
            />
            {errors && (
              <span className="text-red-500 -mt-3 -mb-3 text-center">
                {errors.username?.message}
              </span>
            )}
            <input
              type="text"
              className="login-input-register"
              placeholder="Email"
              {...register('email')}
            />
            {errors && (
              <span className="text-red-500 -mt-3 -mb-3 text-center">{errors.email?.message}</span>
            )}
            <input
              type="password"
              className="login-input-register"
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
