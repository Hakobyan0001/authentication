import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies.authToken;

  try {
    const user = jwt.verify(authToken, auth.secret);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie('authToken');
    return res.redirect('/login');
  }
}
