import express, { Request, Response, NextFunction } from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import statusCodes from './config/statusCodes';
import { PrismaClient } from '@prisma/client';
import router from './routes/index.js';
import setStatus from './utils/setStatus';

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
router(app);

// Error handler middleware
app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.code === 'permission_denied') {
    setStatus(res, true, {
      status: statusCodes.UnauthorizedError,
      message: 'Error with getting data, please recheck your permissions.'
    });
  } else {
    setStatus(res, true, {
      status: err.statusCode ? err.statusCode : statusCodes.ServerError,
      message: err.message
    });
  }
});

// Default route handler
app.get('*', async (req: Request, res: Response) => {
  return setStatus(res, true, {
    status: statusCodes.NotFoundStatus,
    message: 'Not found.'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    // Example database operation using Prisma
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
});

export default app;
