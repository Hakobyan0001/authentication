import express, { Response } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';

import router from './routes';
import statusCodes from './config/statusCodes';

const app = express();

// Middlewares
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
router(app);

// Error handler middleware
app.use((err: any, res: Response) => {
  res.status(err.statusCode || statusCodes.ServerError).json({
    success: false,
    status: err.statusCode || statusCodes.ServerError,
    message: err.message || 'Server Error'
  });
});

// Default route handler
app.use('*', (res: Response) => {
  res.status(statusCodes.NotFoundStatus).json({
    success: false,
    status: statusCodes.NotFoundStatus,
    message: 'Not Found'
  });
});

export default app;
