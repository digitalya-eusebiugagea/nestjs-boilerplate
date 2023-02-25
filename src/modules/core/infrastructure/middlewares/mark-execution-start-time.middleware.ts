import { Request, Response, NextFunction } from 'express';

export function markExecutionStartTimeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  (req as any).executionStartTime = process.hrtime();
  next();
}
