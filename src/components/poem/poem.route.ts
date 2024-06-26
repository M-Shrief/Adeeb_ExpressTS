import { Router } from 'express';
import { body, param } from 'express-validator';
// Controller
import { PoemController } from './poem.controller';
// Types
import { ERROR_MSG } from '../../interfaces/poem.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();
router.get('/poems', setCache, PoemController.indexWithPoetName);
router.get(
  '/poems/:id',
  [
    validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
    setCache,
  ],
  PoemController.indexOneWithPoet,
);
router.post('/poems/many', PoemController.postMany);
router.post(
  '/poems',
  validate([
    body('intro', ERROR_MSG.INTRO).isString().escape(),

    body('poet', ERROR_MSG.POET).isMongoId(),

    body('verses', ERROR_MSG.VERSES).isArray(),
    body('verses.*.first', ERROR_MSG.VERSES).isString().escape(),

    body('verses.*.sec',  ERROR_MSG.VERSES).isString().escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoemController.post,
);
router.put(
  '/poems/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isMongoId(),

    body('intro', ERROR_MSG.INTRO).optional().isString().escape(),

    body('poet', ERROR_MSG.POET).optional().isMongoId(),

    body('verses', ERROR_MSG.VERSES).optional().isArray(),

    body('verses.*.first', ERROR_MSG.VERSES)
      .optional()
      .isString()
      .escape(),

    body('verses.*.sec',  ERROR_MSG.VERSES)
      .optional()
      .isString()
      .escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  PoemController.update,
);

router.delete(
  '/poems/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).optional().isMongoId(),
  ]),
  PoemController.remove,
);

export const PoemRoute = router;
