import { Router } from 'express';
import { param } from 'express-validator';
// Controller
import ChosenVerseController from '../controllers/chosenVerse.controller';
// Types
import { IRoute } from '../interfaces/route.interface';
// middlewares
import validate from '../middlewares/validate.middleware';

export default class ChosenVerseRoute implements IRoute {
  public router: Router = Router();
  private controller: ChosenVerseController = new ChosenVerseController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/chosenverses', this.controller.indexWithPoetName);
    this.router.get('/chosenverses/:num', this.controller.indexRandom);
    this.router.get('/chosenverse/:id', this.controller.indexOneWithPoetName);
    this.router.post('/chosenverse', this.controller.post);
    this.router.put('/chosenverse/:id', this.controller.update);
    this.router.delete('/chosenverse/:id', this.controller.remove);
  }
}
