import jwt from 'jsonwebtoken';

import { UserModel } from './userModel';
import redisClient from '../../config/redis';
import { signJWT } from '../../utils/jwt';

const THIRTY_MINUTES = 30 * 60;
export const signTokens = async (user) => {
  // Caching session
  redisClient.set(user.id, JSON.stringify(user), { EX: THIRTY_MINUTES });

  const access_token = signJWT({ sub: user.id }, 'ACCESSTOKEN_PRIVATE_KEY', {
    expiresIn: `${parseInt(process.env.ACCESS_TOKEN_TIMEOUT)}m`,
  });

  const refresh_token = signJWT({ sub: user.id }, 'REFRESHTOKEN_PRIVATE_KEY', {
    expiresIn: `${parseInt(process.env.REFRESH_TOKEN_TIMEOUT)}m`,
  });

  return { access_token, refresh_token };
};

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    const publickKey = Buffer.from(
      process.env['ACCESSTOKEN_PUBLIC_KEY'],
      'base64'
    ).toString('utf-8');
    const decoded = jwt.verify(token, publickKey);

    const user = await UserModel.findById(decoded.sub);
    return {
      user,
    };
  } catch (error) {
    throw new Error('Authentication error');
  }
};
