import { Application } from 'express';
import { MainService } from '../services/main.service';

export class Controller {
  private mainService: MainService;

  constructor(private app: Application) {
    this.mainService = new MainService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.mainService.welcomeMessage);
  }
}