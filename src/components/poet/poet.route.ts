import { Router } from 'express';
import { body, param } from 'express-validator';
// PoetController
import { PoetController } from './poet.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from '../../interfaces/poet.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/poets', setCache, PoetController.index);
router.get(
  '/poet/:id',
  [
    validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
    setCache,
  ],
  PoetController.indexOneWithLiterature,
);
router.post('/poets', PoetController.postMany);
router.post(
  '/poet',
  validate([
    body('name', ERROR_MSG.NAME).isString().escape(),

    body('time_period', ERROR_MSG.TIME_PERIOD).isString().escape(),

    body('bio', ERROR_MSG.BIO).isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoetController.post,
);
router.put(
  '/poet/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isMongoId(),

    body('name', ERROR_MSG.NAME).optional().isString().escape(),

    body('time_period', ERROR_MSG.TIME_PERIOD)
      .optional()
      .isString()
      .escape(),

    body('bio', ERROR_MSG.BIO).optional().isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoetController.update,
);
router.delete(
  '/poet/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
  PoetController.remove,
);

export const PoetRoute: IRoute = {
  router,
};
