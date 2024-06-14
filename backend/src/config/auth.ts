import dotenv from 'dotenv';

dotenv.config();

type AuthConfig = {
  secret: string;
  tokenExpiration: string;
};

const auth: AuthConfig = {
  secret: process.env.JWT_SECRET as string,
  tokenExpiration: process.env.JWT_EXPIRATION || '86400'
};

export default auth;
