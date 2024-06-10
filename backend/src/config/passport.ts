import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/UserModel';
import UserService from '../services/UsersService';
import auth from './auth';
import statusCodes from './statusCodes';

// Local login strategy options
const localOptions: passport.IStrategyOptions = {
  usernameField: 'email'
};

// Local login strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } });

    // Check for wrong credentials
    const wrongCredentials = !user || !user.active || !user.password;
    const passwordMatch = user ? await user.comparePassword(password) : false;
    if (wrongCredentials || !passwordMatch) {
      return done({
        message: 'Wrong email or password',
        statusCode: statusCodes.UnauthorizedError
      });
    }

    return done(null, user);
  } catch (err) {
    return done({
      message: 'Internal error.',
      statusCode: statusCodes.ServerError
    });
  }
});

// JWT strategy options
const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: auth.secret
};

// JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  const userService = new UserService();
  let user;
  try {
    user = await userService.getById(jwtPayload.id);
  } catch (err) {
    return done(err, false);
  }

  if (!user || !user.active) {
    done(null, false);
  }

  done(null, user);
});

// Use strategies
passport.use(jwtLogin);
passport.use(localLogin);

export default passport;
