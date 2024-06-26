import { Cookies } from 'react-cookie';

import { cookieOptionsWithoutRemMe, cookieOptionsWithRemMe } from '../config/cookieOptions';

class CookieService {
  private cookies: Cookies;

  constructor() {
    this.cookies = new Cookies();
  }

  setCookieWithRemMe(name: string, value: any) {
    this.cookies.set(name, value, cookieOptionsWithRemMe);
  }
  setCookieWithoutRemMe(name: string, value: any) {
    this.cookies.set(name, value, cookieOptionsWithoutRemMe);
  }
  getCookie(name: string) {
    return this.cookies.get(name);
  }

  removeCookie(name: string) {
    this.cookies.remove(name);
  }
}

const cookieService = new CookieService();
export default cookieService;
