import { Application } from 'express';
import { GameService } from '../services/game.service';

export class GameController {
  private gameService: GameService;

  constructor(private app: Application) {
    this.gameService = new GameService();
    this.routes();
  }

  public routes() {
    this.app.route('/games').get(this.gameService.getAllGames);
    this.app.route('/game').post(this.gameService.addGame);
    this.app.route('/game/:id')
      .get(this.gameService.getGame)
      .put(this.gameService.updateGame)
      .delete(this.gameService.deleteGame);
  }
}