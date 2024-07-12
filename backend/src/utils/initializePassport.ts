import { Strategy as LocalStrategy } from 'passport-local';
import AuthService from '../services/AuthService';
import bcryptHelper from './bcrypt';
import { PassportStatic } from 'passport';

const authService = new AuthService();
const { comparePassword } = bcryptHelper();

interface AuthenticateUser {
  (email: string, password: string, done: (error: any, user?: any, options?: any) => void): void;
}
interface User {
  id: string;
  email?: string;
  password?: string;
}

export default function initializePassPort(passport: PassportStatic) {
  const authenticateUser: AuthenticateUser = async (email, password, done) => {
    try {
      const user = await authService.findUser(email);

      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, (user as User).id);
  });
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await authService.findUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}
