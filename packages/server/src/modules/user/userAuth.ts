import jwt from 'jsonwebtoken';

import { UserModel } from './userModel';
import { signJWT } from '../../utils/jwt';

export const signTokens = async (user) => {
  const access_token = signJWT({ sub: user.id }, 'ACCESSTOKEN_PRIVATE_KEY', {
    expiresIn: `${parseInt(process.env.ACCESS_TOKEN_TIMEOUT)}m`,
  });

  return { access_token };
};

export const getUser = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  try {
    const publickKey = Buffer.from(
      process.env['ACCESSTOKEN_PUBLIC_KEY'],
      'base64'
    ).toString('utf-8');
    const decoded = jwt.verify(token, publickKey);

    if (!decoded) {
      return { user: null };
    }

    const user = await UserModel.findById(decoded.sub);

    if (!user) {
      return { user: null };
    }

    return {
      user,
    };
  } catch (error) {
    return { user: null };
  }
};
