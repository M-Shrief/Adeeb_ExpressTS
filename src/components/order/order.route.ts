import { Router } from 'express';
import { body, param } from 'express-validator';
// controllers
import { OrderController } from './order.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from '../../interfaces/order.interface';
// middlewares
import {
  guard,
  jwtToken,
  authErrorHandler,
} from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';
export class OrderRoute implements IRoute {
  public router: Router = Router();
  private controller = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/orders/guest',
      [
        validate([
          body('name')
            .isLength({ min: 4, max: 50 })
            .isString()
            .escape()
            .withMessage(ERROR_MSG.NAME),
          body('phone')
            .escape()
            .isMobilePhone('any')
            .withMessage(ERROR_MSG.PHONE),
        ]),
        setCache,
      ],
      this.controller.indexGuestOrders,
    );
    this.router.get(
      '/orders/:partner',
      [
        jwtToken(true),
        guard.check(['partner:read', 'partner:write']),
        authErrorHandler,        
        validate([param('partner').isMongoId().withMessage(ERROR_MSG.PARTNER)])
      ],
      this.controller.indexPartnerOrders,
    );
    this.router.post(
      '/order',
      [
        jwtToken(false),
        authErrorHandler,       
        validate([
        body('partner').optional().isMongoId().withMessage(ERROR_MSG.PARTNER),

        body('name')
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.NAME),

        body('phone')
          .escape()
          .isMobilePhone('any')
          .withMessage(ERROR_MSG.PHONE),

        body('address')
        .isLength({ min: 4, max: 100 })
        .withMessage(ERROR_MSG.ADDRESS), // should have more constraints

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),

        body('completed')
          .optional()
          .isBoolean()
          .withMessage(ERROR_MSG.COMPLETED),

        body('products.*.fontType')
          .optional()
          .isLength({ max: 10 })
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.fontColor')
          .optional()
          .isLength({ max: 8 })
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.backgroundColor')
          .optional()
          .isLength({ max: 8 })
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.print')
          .optional()
          .isObject()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.prints')
          .optional()
          .isArray()
          .withMessage(ERROR_MSG.PRODUCTS),
      ]),],
      this.controller.post,
    );
    this.router.put(
      '/order/:id',
      validate([
        param('id').isMongoId().withMessage(ERROR_MSG.NOT_FOUND),

        body('partner').optional().isMongoId().withMessage(ERROR_MSG.PARTNER),

        body('name')
          .optional()
          .isLength({ min: 4, max: 50 })
          .isString()
          .escape()
          .withMessage(ERROR_MSG.NAME),

        body('phone')
          .optional()
          .escape()
          .isMobilePhone('any')
          .withMessage(ERROR_MSG.PHONE),

        body('address')
        .isLength({ min: 4, max: 50 })
        .isString()
        .escape()
        .withMessage(ERROR_MSG.ADDRESS),

        body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),

        body('completed')
          .optional()
          .isBoolean()
          .withMessage(ERROR_MSG.COMPLETED),

        body('products.*.fontType')
          .optional()
          .isLength({ max: 10 })
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.fontColor')
          .optional()
          .isLength({ max: 8 })
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.backgroundColor')
          .optional()
          .isLength({ max: 8 })
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
        body('products.*.print.*')
          .optional()
          .isString()
          .withMessage(ERROR_MSG.PRODUCTS),
      ]),
      this.controller.update,
    );

    this.router.delete(
      '/order/:id',
      validate([param('id').isMongoId().withMessage(ERROR_MSG.NOT_FOUND)]),
      this.controller.remove,
    );
  }
}
