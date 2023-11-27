import { NextFunction, Request, Response } from 'express';
// Services
import { PoetService } from './poet.service';
// Types
import { PoetType, ERROR_MSG } from '../../interfaces/poet.interface';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

export const PoetController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.getAll();
      const { status, poets, errMsg } = responseInfo.index(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  indexOneWithLiterature: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await PoetService.getOneWithLiterature(req.params.id);
      const { status, poet, errMsg } =
        responseInfo.indexOneWithLiterature(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poet);
    } catch (err) {
      next(err);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.post(req.body);
      const { status, poet, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);

      res.status(status).send(poet);
    } catch (errors) {
      next(errors);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.postMany(req.body);
      const { status, poets, errMsg } = responseInfo.postMany(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.status(status).send(poets);
    } catch (errors) {
      next(errors);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) {
        throw new AppError(status, errMsg, true);
      }
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoetService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
};

export const responseInfo = {
  index: (
    poets: PoetType['details'][] | false,
  ): { status: number; poets?: PoetType['details'][]; errMsg?: string } => {
    if (!poets) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poets };
  },
  indexOneWithLiterature: (
    poet: PoetType | false,
  ): { status: number; poet?: PoetType; errMsg?: string } => {
    if (!poet) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, poet };
  },
  post: (
    poet: PoetType['details'] | false,
  ): { status: number; poet?: PoetType['details']; errMsg?: string } => {
    if (!poet) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poet };
  },
  postMany: (
    poets: { newPoets: PoetType['details'][]; inValidPoets: PoetType['details'][] } | false,
  ): {
    status: number;
    poets?: { newPoets: PoetType['details'][]; inValidPoets: PoetType['details'][] };
    errMsg?: string;
  } => {
    if (!poets) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poets };
  },
  update: (poet: PoetType['details'] | false): { status: number; errMsg?: string } => {
    if (!poet) 
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (poet: PoetType['details'] | false): { status: number; errMsg?: string } => {
    if (!poet) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
