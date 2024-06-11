import { Application } from 'express';
import auth from './authRoutes';

export default function (app: Application) {
  app.use('/auth', auth);
}
