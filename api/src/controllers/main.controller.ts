import { Application } from 'express';
import { GameService } from '../services/game.services';
import { MainService } from '../services/main.service';
import { PlatformService } from '../services/platform.services';

export class Controller {
  private mainService: MainService;
  private gameService: GameService;
  private platformService: PlatformService;

  constructor(private app: Application) {
    this.mainService = new MainService();
    this.gameService = new GameService();
    this.platformService = new PlatformService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.mainService.welcomeMessage);
    this.app.route('/games').get(this.gameService.getAllGames);
    this.app.route('/platforms').get(this.platformService.getAllPlatforms);
    this.app.route('/platform').post(this.platformService.addPlatform);
    this.app.route('/platform/:id')
      .put(this.platformService.updatePlatform)
      .delete(this.platformService.deletePlatform);
  }
}