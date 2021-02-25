import { Application } from 'express';
import { GameService } from '../services/game.service';
import { GenreService } from '../services/genre.service';
import { MainService } from '../services/main.service';
import { PlatformService } from '../services/platform.service';

export class Controller {
  private mainService: MainService;
  private gameService: GameService;
  private platformService: PlatformService;
  private genreService: GenreService;

  constructor(private app: Application) {
    this.mainService = new MainService();
    this.gameService = new GameService();
    this.platformService = new PlatformService();
    this.genreService = new GenreService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.mainService.welcomeMessage);
    this.app.route('/games').get(this.gameService.getAllGames);
    this.app.route('/game').post(this.gameService.addGame);
    this.app.route('/game/:id')
      .get(this.gameService.getGame)
      .put(this.gameService.updateGame)
      .delete(this.gameService.deleteGame);
    this.app.route('/platforms').get(this.platformService.getAllPlatforms);
    this.app.route('/platform').post(this.platformService.addPlatform);
    this.app.route('/platform/:id')
      .put(this.platformService.updatePlatform)
      .delete(this.platformService.deletePlatform);
    this.app.route('/genres').get(this.genreService.getAllGenres);
    this.app.route('/genre').post(this.genreService.addGenre);
    this.app.route('/genre/:id')
      .put(this.genreService.updateGenre)
      .delete(this.genreService.deleteGenre);
  }
}