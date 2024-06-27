import express, { Request, Response, NextFunction } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import router from './routes';
import statusCodes from './config/statusCodes';
import setStatus from './utils/setStatus';
import cookieParser from 'cookie-parser'
const app = express();

// Middlewares
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(cookieParser())
app.use(json());

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
