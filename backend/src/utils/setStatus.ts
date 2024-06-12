import { Response } from 'express';

type ErrorResponse = {
  status: number;
  message: string;
};

const setStatus = (res: Response, isError: boolean, data: ErrorResponse): any => {
  const status = data.status || (isError ? 500 : 200);
  return res.status(status).json({ isError, ...data });
};

export default setStatus;
