import { Request, Response } from 'express';
import { Game } from '../models/game.model';

export class GameService {
  public async getAllGames(req: Request, res: Response) {
    try {
      const games = await Game.find().populate(['genre', 'platform']);
      if (games) {
        res
          .status(200)
          .json({ message: 'Fetched games', games });
        console.log('✅ FETCHED GAMES');
      }
    } catch(err) {
      console.log('❌ ERROR FETCHING GAMES');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to fetch games' });
    }
  }
}