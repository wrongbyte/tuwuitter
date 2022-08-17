import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    ACCESSTOKEN_PRIVATE_KEY: str(),
    REFRESHTOKEN_PRIVATE_KEY: str(),
    ACCESSTOKEN_PUBLIC_KEY: str(),
    REFRESHTOKEN_PUBLIC_KEY: str(),
    MONGO_URI: str(),
  });
};

export default validateEnv;
