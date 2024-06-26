import { Response } from 'express';
// Utils
import { logger } from './logger';
import HttpStatusCode from './httpStatusCode';

// centralized error object that derives from Node’s Error
export class AppError extends Error {
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    httpCode: HttpStatusCode,
    message: string,
    isOperational: boolean,
  ) {
    super(message);

    this.httpCode = httpCode;
    this.isOperational = isOperational || false;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    Error.captureStackTrace(this);
  }
}


export const isTrustedError = (error: Error) => {
  if (error instanceof AppError) {
    return error.isOperational;
  }
  return false;
};

export const handleTrustedError = (error: AppError, res: Response): void => {
  logger.error({
    errorCode: error.httpCode,
    message: error.message,
    isOperational: true,
    stack: error.stack,
  });
  res
    .status(error.httpCode)
    .json({ message: error.message });
};
