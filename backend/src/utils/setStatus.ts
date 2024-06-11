import { Response } from 'express';

type ErrorResponse = {
  status: number;
  message: string;
};

const setStatus = (res: Response, isError: boolean, data: ErrorResponse): void => {
  if (isError) {
    res.status(data.status).json({ error: true, message: data.message });
  } else {
    res.status(data.status).json({ error: false, message: data.message });
  }
};

export default setStatus;
