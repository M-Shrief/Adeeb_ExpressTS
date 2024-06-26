import { NextFunction, Request, Response } from 'express';
// Services
import { ChosenVerseService } from './chosenVerse.service';
// Types
import {
  ChosenVerseType,
  ERROR_MSG,
} from '../../interfaces/chosenVerse.interface';
// Utils
import { AppError } from '../../utils/errors';
import HttpStatusCode from '../../utils/httpStatusCode';

export const ChosenVerseController = {
  indexWithPoetName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const service = await ChosenVerseService.getAllWithPoetName();
      const { status, chosenVerses, errMsg } =
        responseInfo.indexWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerses);
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
      const service = await ChosenVerseService.getRandomWithPoetName(
        Number(req.query.num),
      );
      const { status, chosenVerses, errMsg } =
        responseInfo.indexRandomWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerses);
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
      const service = await ChosenVerseService.getOneWithPoetName(
        req.params.id,
      );
      const { status, chosenVerse, errMsg } =
        responseInfo.indexOneWithPoetName(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.post(req.body);
      const { status, chosenVerse, errMsg } = responseInfo.post(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerse);
    } catch (error) {
      next(error);
    }
  },

  postMany: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.postMany(req.body);
      const { status, chosenVerses, errMsg } = responseInfo.postMany(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(chosenVerses);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await ChosenVerseService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
};

export const responseInfo = {
  indexWithPoetName: (
    chosenVerses: ChosenVerseType[] | false,
  ): { status: number; chosenVerses?: ChosenVerseType[]; errMsg?: string } => {
    if (!chosenVerses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, chosenVerses };
  },
  indexRandomWithPoetName: (
    chosenVerses: ChosenVerseType[] | false,
  ): { status: number; chosenVerses?: ChosenVerseType[]; errMsg?: string } => {
    if (!chosenVerses) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_AVAILABLE,
      };
    }
    return { status: HttpStatusCode.OK, chosenVerses };
  },
  indexOneWithPoetName: (
    chosenVerse: ChosenVerseType | false,
  ): { status: number; chosenVerse?: ChosenVerseType; errMsg?: string } => {
    if (!chosenVerse) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.OK, chosenVerse };
  },
  post: (
    chosenVerse: ChosenVerseType | false,
  ): { status: number; chosenVerse?: ChosenVerseType; errMsg?: string } => {
    if (!chosenVerse) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, chosenVerse };
  },
  postMany: (
    chosenVerses:
      | {
          newChosenVerses: ChosenVerseType[];
          inValidChosenVerses: ChosenVerseType[];
        }
      | false,
  ): {
    status: number;
    chosenVerses?: {
      newChosenVerses: ChosenVerseType[];
      inValidChosenVerses: ChosenVerseType[];
    };
    errMsg?: string;
  } => {
    if (!chosenVerses) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, chosenVerses };
  },
  update: (
    chosenVerse: ChosenVerseType | false,
  ): { status: number; errMsg?: string } => {
    if (!chosenVerse) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (
    chosenVerse: ChosenVerseType | false,
  ): { status: number; errMsg?: string } => {
    if (!chosenVerse) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
};
