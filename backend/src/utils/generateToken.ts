import { sign } from 'jsonwebtoken';
import auth from '../config/auth';

const generateToken = (payload: object) => {
  return sign(payload, auth.secret, {
    expiresIn: parseInt(auth.tokenExpiration)
  });
};

export default generateToken;
