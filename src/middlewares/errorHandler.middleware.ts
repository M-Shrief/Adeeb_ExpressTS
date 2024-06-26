import { Request, Response, NextFunction } from 'express';
import { AppError, handleTrustedError, isTrustedError } from '../utils/errors';

export const errorMiddleware = async (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!isTrustedError(err)) process.exit(1);
  handleTrustedError(err, res);
};
