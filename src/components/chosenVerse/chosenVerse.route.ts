import { Router } from 'express';
import { body, query, param } from 'express-validator';
// Controller
import { ChosenVerseController } from './chosenVerse.controller';
// Types
import { IRoute } from '../../interfaces/route.interface';
import { ERROR_MSG } from '../../interfaces/chosenVerse.interface';
// middlewares
import { validate } from '../../middlewares/validate.middleware';
import { setCache } from '../../middlewares/cache.middleware';

const router: Router = Router();

router.get('/chosenverses', setCache, ChosenVerseController.indexWithPoetName);
router.get(
  '/chosenverses/random',
  validate([query('num', ERROR_MSG.NUM).optional().isInt()]),
  ChosenVerseController.indexRandomWithPoetName,
);
router.get(
  '/chosenverse/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
  ChosenVerseController.indexOneWithPoetName,
);
router.post('/chosenverses', ChosenVerseController.postMany);
router.post(
  '/chosenverse',
  validate([
    body('poet', ERROR_MSG.POET).isMongoId(),

    body('poem', ERROR_MSG.POEM).isMongoId(),

    body('tags', ERROR_MSG.TAGS).isString().escape(),

    body('verses', ERROR_MSG.VERSES).isArray(),
    body('verses.*.first', ERROR_MSG.VERSES).isString().escape(),
    body('verses.*.sec', ERROR_MSG.VERSES).isString().escape(),
    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  ChosenVerseController.post,
);
router.post('/chosenverses', ChosenVerseController.postMany);

router.put(
  '/chosenverse/:id',
  validate([
    param('id', ERROR_MSG.NOT_FOUND).isMongoId(),

    body('poet', ERROR_MSG.POET).optional().isMongoId(),

    body('poem', ERROR_MSG.POEM).optional().isMongoId(),

    body('tags', ERROR_MSG.TAGS).optional().isString().escape(),

    body('verses').optional().isArray(),

    body('verses.*.first', ERROR_MSG.VERSES)
      .optional()
      .isString()
      .escape(),

    body('verses.*.sec', ERROR_MSG.VERSES)
      .optional()
      .isString()
      .escape(),

    body('reviewed', ERROR_MSG.REVIEWED).optional().isBoolean(),
  ]),
  ChosenVerseController.update,
);
router.delete(
  '/chosenverse/:id',
  validate([param('id', ERROR_MSG.NOT_FOUND).isMongoId()]),
  ChosenVerseController.remove,
);

export const ChosenVerseRoute: IRoute = {
  router,
};
