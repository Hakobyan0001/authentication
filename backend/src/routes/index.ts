import { Application } from 'express';

import auth from './authRoutes';
import home from './homeRoute';

export default function (app: Application) {
  app.use('/auth', auth);
  app.use('/home', home);
}
