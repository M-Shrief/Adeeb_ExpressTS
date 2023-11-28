import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
// Services
import { PartnerService } from './partner.service';
// Types
import { ERROR_MSG } from '../../interfaces/partner.interface';
// Utils
import { decodeToken, signToken } from '../../utils/auth';
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';

const signTokenFn = (name: string, _id: string) =>
  signToken(
    {
      name,
      _id,
      permissions: ['partner:read', 'partner:write'],
    },
    {
      algorithm: 'RS256',
      expiresIn: '8h',
    },
  );

export const PartnerController = {
  indexInfo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const partner = await PartnerService.getInfo(decoded._id);

      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.OK).send(partner);
    } catch (error) {
      next(error);
    }
  },

  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await PartnerService.signup(req.body);
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      const accessToken = signTokenFn(partner.name, partner._id);
      res.status(HttpStatusCode.CREATED).json({
        Success: true,
        partner: {
          _id: partner._id,
          name: partner.name,
          phone: partner.phone,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const partner = await PartnerService.login(
        req.body.phone,
        req.body.password,
      );
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );

      const accessToken = signTokenFn(partner.name, partner._id);
      res.status(HttpStatusCode.ACCEPTED).json({
        success: true,
        partner: {
          _id: partner._id,
          name: partner.name,
          phone: partner.phone,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const partner = await PartnerService.update(decoded._id, req.body);
      if (!partner)
        throw new AppError(
          HttpStatusCode.NOT_ACCEPTABLE,
          ERROR_MSG.NOT_VALID,
          true,
        );
      res.status(HttpStatusCode.ACCEPTED).send(partner);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const partner = await PartnerService.remove(decoded._id);
      if (!partner)
        throw new AppError(HttpStatusCode.NOT_FOUND, ERROR_MSG.NOT_FOUND, true);
      res.status(HttpStatusCode.ACCEPTED).send('Deleted Successfully');
    } catch (errors) {
      next(errors);
    }
  },
};
