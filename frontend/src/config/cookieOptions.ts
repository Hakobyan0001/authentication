type OptionsType = {
  path: string;
  maxAge?: number;
  secure: boolean;
  sameSite: boolean | 'none' | 'lax' | 'strict' | undefined;
};

const cookieOptionsWithRemMe: OptionsType = {
  path: '/',
  maxAge: 3600,
  secure: true,
  sameSite: 'strict'
};

const cookieOptionsWithoutRemMe: OptionsType = {
  path: '/',
  secure: true,
  sameSite: 'strict'
};

export { cookieOptionsWithoutRemMe, cookieOptionsWithRemMe };
