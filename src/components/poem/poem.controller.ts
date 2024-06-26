import { NextFunction, Request, Response } from 'express';
// Services
import { PoemService } from './poem.service';
// Types
import { PoemType, ERROR_MSG } from '../../interfaces/poem.interface';
// Utils
import { AppError } from '../../utils/errors';
import HttpStatusCode from '../../utils/httpStatusCode';

export const PoemController = {
  indexWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await PoemService.getAllWithPoetName();
      const { status, poems, errMsg } = responseInfo.indexWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  indexOneWithPoet: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.getOneWithPoet(req.params.id);
      const { status, poem, errMsg } = responseInfo.indexOneWithPoet(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poem);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.post(req.body);
      const { status, poem, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poem);
    } catch (error) {
      next(error);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.postMany(req.body);
      const { status, poems, errMsg } = responseInfo.postMany(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(poems);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await PoemService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },
};

export const responseInfo = {
  indexWithPoetName: (
    poems: PoemType[] | false,
  ): { status: number; poems?: PoemType[]; errMsg?: string } => {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poems };
  },
  indexIntrosWithPoetName: (
    poems: PoemType[] | false,
  ): { status: number; poems?: PoemType[]; errMsg?: string } => {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, poems };
  },
  indexOneWithPoet: (
    poem: PoemType | false,
  ): { status: number; poem?: PoemType; errMsg?: string } => {
    if (!poem) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, poem };
  },
  post: (
    poem: PoemType | false,
  ): { status: number; poem?: PoemType; errMsg?: string } => {
    if (!poem) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poem };
  },
  postMany: (
    poems: { newPoems: PoemType[]; inValidPoems: PoemType[] } | false,
  ): {
    status: number;
    poems?: { newPoems: PoemType[]; inValidPoems: PoemType[] };
    errMsg?: string;
  } => {
    if (!poems) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, poems };
  },
  update: (poem: PoemType | false): { status: number; errMsg?: string } => {
    if (!poem) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (poem: PoemType | false): { status: number; errMsg?: string } => {
    if (!poem) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
