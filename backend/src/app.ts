import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import setStatus from './utils/setStatus';
import { statusCodes } from './config';
import router from './routes';

import './utils/cleanupExpiredTokens';

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
// Routes
router(app);

// Error handler middleware
app.use((err: any, req: Request, res: Response) => {
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
