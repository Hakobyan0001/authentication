import { SessionOptions } from 'express-session';

type cookieOptionsType = {
  path: string;
  maxAge?: number;
  secure: boolean;
  sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
  httpOnly: boolean;
};

const cookieOptions: cookieOptionsType = {
  path: '/',
  secure: false,
  sameSite: 'strict',
  httpOnly: true
};

const sessionOptions: SessionOptions = {
  secret: (process.env.SESSION_SECRET as string) || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: cookieOptions
};
export { cookieOptions };
export default sessionOptions;
