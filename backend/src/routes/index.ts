import auth from './authRoutes';

export default function (app) {
  app.use('/auth', auth);
}
