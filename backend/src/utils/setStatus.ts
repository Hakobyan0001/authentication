import { Response } from 'express';

interface ErrorResponse {
  status: number;
  message: string;
  severity?: string;
}

function setStatus(res: Response, isError: boolean, data: ErrorResponse): void {
  const status = data.status || (isError ? 500 : 200);
  res.status(status).json({ isError, ...data });
}

export default setStatus;
