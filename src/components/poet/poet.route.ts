import { Router } from 'express';
import { body, param } from 'express-validator';
// PoetController
import { PoetController } from './poet.controller';
// Types
import { ERROR_MSG } from '../../interfaces/poet.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/poets', setCache, PoetController.index);
router.get(
  '/poets/:id',
  [
    validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
    setCache,
  ],
  PoetController.indexOneWithLiterature,
);
router.post(
  '/poets',
  validate([
    body('name', ERROR_MSG.NAME).isString().escape(),

    body('time_period', ERROR_MSG.TIME_PERIOD).isString().escape(),

    body('bio', ERROR_MSG.BIO).isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoetController.post,
);
router.post('/poets/many', PoetController.postMany);
router.put(
  '/poets/:id',
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
  '/poets/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
  PoetController.remove,
);

export const PoetRoute = router;
