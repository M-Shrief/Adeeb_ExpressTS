import { NextFunction, Request, Response } from 'express';
// Services
import { PoemService } from './poem.service';
// Types
import { PoemType, ERROR_MSG } from '../../interfaces/poem.interface';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export const PoemController = {
  indexWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const poems = await PoemService.getAllWithPoetName();

      if (!poems)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(poems);
    } catch (error) {
      next(error);
    }
  },

  indexIntrosWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const poems = await PoemService.getAllIntrosWithPoetName();

      if (!poems)
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ERROR_MSG.NOT_AVAILABLE,
          true,
        );
      res.status(HttpStatusCode.OK).send(poems);
    } catch (error) {
      next(error);
    }
  },

  indexOneWithPoet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await PoemService.getOneWithPoet(req.params.id);
      if (!poem)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(poem);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await PoemService.post(req.body as PoemType);
      if (!poem)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(poem);
    } catch (error) {
      next(error);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poems = await PoemService.postMany(req.body as PoemType[]);
      if (!poems)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.CREATED).send(poems);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await PoemService.update(
        req.params.id,
        req.body as PoemType,
      );
      if (!poem)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send(poem);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poem = await PoemService.remove(req.params.id);
      if (!poem)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send(poem);
    } catch (error) {
      next(error);
    }
  },
};
