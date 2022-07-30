import jwt, { SignOptions } from 'jsonwebtoken';

export const signJWT = (
  payload: Record<string, string>,
  keyname: 'ACCESSTOKEN_PRIVATE_KEY' | 'REFRESHTOKEN_PRIVATE_KEY',
  options: SignOptions
) => {
  const privateKey = Buffer.from(process.env[keyname], 'base64').toString(
    'utf-8'
  );
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJWT = <Token>(
  token: string,
  keyname: 'ACCESSTOKEN_PUBLIC_KEY' | 'REFRESHTOKEN_PUBLIC_KEY'
): Token | null => {
  try {
    const publicKey = Buffer.from(process.env[keyname], 'base64').toString(
      'utf-8'
    );
    const decoded = jwt.verify(token, publicKey) as Token;
    return decoded;
  } catch (error) {
    return null;
  }
};
