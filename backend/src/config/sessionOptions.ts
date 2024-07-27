import { SessionOptions } from 'express-session';

import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import cookieOptions from './cookieOptions';

const sessionOptions: SessionOptions = {
  secret: (process.env.SESSION_SECRET as string) || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: cookieOptions,
  store: new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined
  })
};
export default sessionOptions;
