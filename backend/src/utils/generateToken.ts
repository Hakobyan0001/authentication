import { sign } from 'jsonwebtoken';

import { auth } from '../config';

function generateToken(payload: object) {
  return sign(payload, auth.secret, {
    expiresIn: parseInt(auth.tokenExpiration)
  });
}

export default generateToken;
