import { useCookies } from 'react-cookie';

type User = {
  token: string;
  email: string;
  fullName: string;
};

export const setAuthCookies = (user: User) => {
  const [, setCookie] = useCookies(['user']);

  setCookie('user', JSON.stringify(user), {
    path: '/',
    maxAge: 3600, // Cookie expiry time in seconds (e.g., 1 hour)
    secure: true, // Cookie will only be sent over HTTPS
    sameSite: 'strict' // Restricts the cookie to be sent only with "same-site" requests
  });
};
