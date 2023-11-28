import { NextFunction, Request, Response } from 'express';
// Services
import { OrderService } from './order.service';
// Types
import { ERROR_MSG, OrderType } from '../../interfaces/order.interface';
import { JwtPayload } from 'jsonwebtoken';
// Utils
import { AppError } from '../../utils/errorsCenter/appError';
import HttpStatusCode from '../../utils/httpStatusCode';
import { decodeToken } from '../../utils/auth';

export const OrderController = {
  indexGuestOrders: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await OrderService.getGuestOrders(
        req.body.name as string,
        req.body.phone as string,
      );
      const { status, orders, errMsg } = responseInfo.indexOrders(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(orders);
    } catch (error) {
      next(error);
    }
  },

  indexPartnerOrders: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await OrderService.getPartnerOrders(decoded.id);
      const { status, orders, errMsg } = responseInfo.indexOrders(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(orders);
    } catch (error) {
      next(error);
    }
  },

  postGuest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await OrderService.post(req.body);
      const { status, order, errMsg } = responseInfo.postOrder(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(order);
    } catch (error) {
      next(error);
    }
  },

  postPartner: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decoded = decodeToken(
        req.headers.authorization!.slice(7),
      ) as JwtPayload;
      const service = await OrderService.post({
        ...req.body,
        partnerId: decoded.id,
      });
      const { status, order, errMsg } = responseInfo.postOrder(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.status(status).send(order);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await OrderService.update(req.params.id, req.body);
      const { status, errMsg } = responseInfo.update(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await OrderService.remove(req.params.id);
      const { status, errMsg } = responseInfo.remove(service);
      if (errMsg) throw new AppError(status, errMsg, true);
      res.sendStatus(status);
    } catch (errors) {
      next(errors);
    }
  },
};

export const responseInfo = {
  indexOrders: (
    orders: OrderType[] | false,
  ): { status: number; orders?: OrderType[]; errMsg?: string } => {
    if (!orders) {
      return {
        status: HttpStatusCode.NOT_FOUND,
        errMsg: ERROR_MSG.NOT_FOUND,
      };
    }
    return { status: HttpStatusCode.OK, orders };
  },
  postOrder: (
    order: OrderType | false,
  ): { status: number; order?: OrderType; errMsg?: string } => {
    if (!order) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.CREATED, order };
  },
  update: (order: OrderType | false): { status: number; errMsg?: string } => {
    if (!order) {
      return {
        status: HttpStatusCode.NOT_ACCEPTABLE,
        errMsg: ERROR_MSG.NOT_VALID,
      };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
  remove: (order: OrderType | false): { status: number; errMsg?: string } => {
    if (!order) {
      return { status: HttpStatusCode.NOT_FOUND, errMsg: ERROR_MSG.NOT_FOUND };
    }
    return { status: HttpStatusCode.ACCEPTED };
  },
}