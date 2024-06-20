import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../../config/auth';

interface JwtPayload {
  id: string;
  email: string;
}

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, auth.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded as JwtPayload;
    next();
  });
}
