import jwt from 'jsonwebtoken';
import auth from '../config/auth';

const generateToken = (user: any) => {
  return jwt.sign(user, auth.secret, {
    expiresIn: parseInt(auth.tokenExpiration)
  });
};

export default generateToken;
