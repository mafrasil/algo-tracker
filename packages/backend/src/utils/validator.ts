import { Request, Response, NextFunction } from 'express';

export const validateAddress = (req: Request, res: Response, next: NextFunction) => {
  if (typeof req.body.address !== 'string') {
    return res.status(400).json({ error: 'Invalid address format' });
  }
  next();
};
