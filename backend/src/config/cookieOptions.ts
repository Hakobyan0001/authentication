type cookieOptionsType = {
  path: string;
  maxAge?: number;
  secure: boolean;
  httpOnly: boolean;
};

const cookieOptions: cookieOptionsType = {
  path: '/',
  secure: false,
  httpOnly: true
};

export default cookieOptions;
