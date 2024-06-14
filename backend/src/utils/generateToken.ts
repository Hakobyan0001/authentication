import { sign } from 'jsonwebtoken';
import auth from '../config/auth';

const generateToken = (user: object) => {
  return sign(user, auth.secret, {
    expiresIn: parseInt(auth.tokenExpiration)
  });
};

export default generateToken;
