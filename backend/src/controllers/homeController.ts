import { Request, Response } from 'express';

import { severities, statusCodes } from '../config';
import setStatus from '../utils/setStatus';

export async function home(req: Request, res: Response) {
  console.log(req.sessionID);
  try {
    res.json({ click: 'clicked', severity: severities.success, message: 'click successful' });
  } catch (error) {
    console.error('click error:', error);
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error',
      severity: severities.error
    });
  }
}
