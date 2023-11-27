import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoemController } from './poem.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from '../../interfaces/poem.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();
router.get('/poems', setCache, PoemController.indexWithPoetName);
router.get('/poems_intros', setCache, PoemController.indexIntrosWithPoetName);
router.get(
  '/poem/:id',
  [
    validate([param('id').isMongoId().withMessage(ERROR_MSG.NOT_FOUND)]),
    setCache,
  ],
  PoemController.indexOneWithPoet,
);
router.post('/poems', PoemController.postMany);
router.post(
  '/poem',
  validate([
    body('intro').isString().escape().withMessage(ERROR_MSG.INTRO),

    body('poet').isMongoId().withMessage(ERROR_MSG.POET),

    body('verses').isArray().withMessage(ERROR_MSG.VERSES),
    body('verses.*.first').isString().escape().withMessage(ERROR_MSG.VERSES),

    body('verses.*.sec').isString().escape().withMessage(ERROR_MSG.VERSES),

    body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
  ]),
  PoemController.post,
);
router.put(
  '/poem/:id',
  validate([
    param('id').isMongoId().withMessage(ERROR_MSG.NOT_FOUND),

    body('intro').optional().isString().escape().withMessage(ERROR_MSG.INTRO),

    body('poet').optional().isMongoId().withMessage(ERROR_MSG.POET),

    body('verses').optional().isArray().withMessage(ERROR_MSG.VERSES),

    body('verses.*.first')
      .optional()
      .isString()
      .escape()
      .withMessage(ERROR_MSG.VERSES),

    body('verses.*.sec')
      .optional()
      .isString()
      .escape()
      .withMessage(ERROR_MSG.VERSES),

    body('reviewed').optional().isBoolean().withMessage(ERROR_MSG.REVIEWED),
  ]),
  PoemController.update,
);

router.delete(
  '/poem/:id',
  validate([
    param('id').optional().isMongoId().withMessage(ERROR_MSG.NOT_FOUND),
  ]),
  PoemController.remove,
);

export const PoemRoute: IRoute = {
  router,
};
