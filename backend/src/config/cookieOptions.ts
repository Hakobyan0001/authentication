type OptionsType = {
  path: string;
  maxAge?: number;
  secure: boolean;
  sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
  httpOnly: boolean
};

const cookieOptions: OptionsType = {
  path: '/',
  maxAge: 3600 * 1000,
  secure: true,
  sameSite: 'strict',
  httpOnly: true 
};


export { cookieOptions };
