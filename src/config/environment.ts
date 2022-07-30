import dotenv from 'dotenv';

dotenv.config();

export const {
  MONGO_URI,
  PORT,
  ACCESSTOKEN_PRIVATE_KEY,
  REFRESHTOKEN_PRIVATE_KEY,
  ACCESSTOKEN_PUBLIC_KEY,
  REFRESHTOKEN_PUBLIC_KEY,
  REDIS_URI,
} = process.env;
