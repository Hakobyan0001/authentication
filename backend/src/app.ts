import express, { Request, Response, NextFunction } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import './utils/cleanupExpiredTokens';
import router from './routes';
import { statusCodes, sessionOptions } from './config';
import setStatus from './utils/setStatus';
import session from 'express-session';
import initializePassPort from './utils/initializePassport';
import passport from 'passport';

const app = express();
initializePassPort(passport);

// Middlewares
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
// Routes
router(app);

// Error handler middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'permission_denied') {
    setStatus(res, true, {
      status: statusCodes.UnauthorizedError,
      message: 'Error with getting data, please recheck your permissions.'
    });
  } else {
    setStatus(res, true, {
      status: err.statusCode ? err.statusCode : statusCodes.ServerError,
      message: err.message || 'Server error'
    });
  }
});

// Default route handler
app.use('*', (req: Request, res: Response) => {
  setStatus(res, true, {
    status: statusCodes.NotFoundStatus,
    message: 'Not found.'
  });
});

export default app;
