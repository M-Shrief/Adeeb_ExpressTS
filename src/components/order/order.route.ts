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

const router: Router = Router();

router.post(
  '/orders/guest',
  [
    validate([
      body('name', ERROR_MSG.NAME).isString().escape(),
      body('phone', ERROR_MSG.PHONE)
        .isString()
        .escape()
        // .isMobilePhone('any'),
    ]),
    setCache,
  ],
  OrderController.indexGuestOrders,
);

router.get(
  '/orders/partner',
  [
    jwtToken(true),
    guard.check(['partner:read', 'partner:write']),
    authErrorHandler,
  ],
  OrderController.indexPartnerOrders,
);

router.post(
  '/order/guest',
  [
    validate([
      body('name', ERROR_MSG.NAME).isString().escape(),

      body('phone', ERROR_MSG.PHONE)
        .isString()
        .escape(),
        // .isMobilePhone('any')

      body('address', ERROR_MSG.ADDRESS).isString().escape(), // should have more constraints

      body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),

      body('completed', ERROR_MSG.COMPLETED).optional().isBoolean(),

      body('products').notEmpty().isArray(),

      body('products.*.fontType')
        .optional()
        .isString()
        ,
      body('products.*.fontColor')
        .optional()
        .isString()
        ,
      body('products.*.backgroundColor')
        .optional()
        .isString()
        ,
      body('products.*.print')
        .optional()
        .isObject()
        ,
    ]),
  ],
  OrderController.postGuest,
);

router.post(
  '/order/partner',
  [
    jwtToken(true),
    guard.check(['partner:read', 'partner:write']),
    authErrorHandler,
    validate([
      body('name', ERROR_MSG.NAME).isString().escape(),

      body('phone')
        .isString()
        .escape()
        // .isMobilePhone('any')
        .withMessage(ERROR_MSG.PHONE),

      body('address', ERROR_MSG.ADDRESS).isString().escape(), // should have more constraints

      body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),

      body('completed', ERROR_MSG.COMPLETED).optional().isBoolean(),

      body('products', ERROR_MSG.PRODUCTS).notEmpty().isArray(),

      body('products.*.fontType', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.fontColor', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.backgroundColor', ERROR_MSG.PRODUCTS)
        .optional()
        .isString(),
      body('products.*.prints', ERROR_MSG.PRODUCTS)
        .optional()
        .isArray(),
    ]),
  ],
  OrderController.postPartner,
);

router.put(
  '/order/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isMongoId(),

    body('partner', ERROR_MSG.PARTNER).optional().isMongoId(),

    body('name', ERROR_MSG.NAME).optional().isString().escape(),

    body('phone', ERROR_MSG.PHONE)
      .optional()
      .escape()
      .isString(),
      // .isMobilePhone('any')

    body('address', ERROR_MSG.ADDRESS)
      .optional()
      .isString()
      .escape(),
      

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),

    body('completed', ERROR_MSG.COMPLETED).optional().isBoolean(),

    body('products', ERROR_MSG.PRODUCTS)
      .optional()
      .isArray({ min: 1 }),

    body('products.*.fontType', ERROR_MSG.PRODUCTS)
      .optional()
      .isString(),
    body('products.*.fontColor', ERROR_MSG.PRODUCTS)
      .optional()
      .isString(),
    body('products.*.backgroundColor', ERROR_MSG.PRODUCTS)
      .optional()
      .isString(),
    body('products.*.print.*', ERROR_MSG.PRODUCTS)
      .optional()
      .isString(),
  ]),
  OrderController.update,
);

router.delete(
  '/order/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
  OrderController.remove,
);

export const OrderRoute: IRoute = {
  router,
};
