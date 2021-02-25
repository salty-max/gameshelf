import { Application } from 'express';
import { GenreService } from '../services/genre.service';

export class GenreController {
  private genreService: GenreService;

  constructor(private app: Application) {
    this.genreService = new GenreService();
    this.routes();
  }

  public routes() {
    this.app.route('/genres').get(this.genreService.getAllGenres);
    this.app.route('/genre').post(this.genreService.addGenre);
    this.app.route('/genre/:id')
      .put(this.genreService.updateGenre)
      .delete(this.genreService.deleteGenre);
  }
}