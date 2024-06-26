import { NextFunction, Request, Response } from 'express';
// Services
import { ProseService } from './prose.service';
// Types
import { ERROR_MSG, ProseType } from '../../interfaces/prose.interface';
// Utils
import { AppError } from '../../utils/errors';
import HttpStatusCode from '../../utils/httpStatusCode';

export const ProseController = {
  indexWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await ProseService.getAllWithPoetName();
      const {status, proses, errMsg} = responseInfo.indexWithPoetName(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (error) {
      next(error);
    }
  },

  indexRandomWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await ProseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      const {status, proses, errMsg} = responseInfo.indexRandomWithPoetName(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (error) {
      next(error);
    }
  },

  indexOneWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await ProseService.getOneWithPoetName(req.params.id);
      const {status, prose, errMsg} = responseInfo.indexOneWithPoetName(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(prose);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.post(req.body);
      const {status, prose, errMsg} = responseInfo.post(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(prose);
    } catch (errors) {
      next(errors);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.postMany(req.body);
      const {status, proses, errMsg} = responseInfo.postMany(service)
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(proses);
    } catch (errors) {
      next(errors);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ProseService.remove(req.params.id);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);    
    } catch (errors) {
      next(errors);
    }
  },
};

export const responseInfo = {
  indexWithPoetName: (
    proses: ProseType[] | false,
  ): { status: number; proses?: ProseType[]; errMsg?: string } => {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, proses };
  },
  indexRandomWithPoetName: (
    proses: ProseType[] | false,
  ): { status: number; proses?: ProseType[]; errMsg?: string } => {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, proses };
  },
  indexOneWithPoetName: (
    prose: ProseType| false,
  ): { status: number; prose?: ProseType; errMsg?: string } => {
    if (!prose) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, prose };
  },
  post: (
    prose: ProseType | false,
  ): { status: number; prose?: ProseType; errMsg?: string } => {
    if (!prose) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, prose };
  },
  postMany: (
    proses: { newProses: ProseType[]; inValidProses: ProseType[] } | false,
  ): { status: number; proses?: { newProses: ProseType[]; inValidProses: ProseType[] }; errMsg?: string } => {
    if (!proses) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, proses };
  },
  update: (prose: ProseType | false): { status: number; errMsg?: string } => {
    if (!prose) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (prose: ProseType | false): { status: number; errMsg?: string } => {
    if (!prose) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
}