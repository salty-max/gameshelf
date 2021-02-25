import { Request, Response } from 'express';
import { Game } from '../models/game.model';

export class GameService {
  public async getAllGames(req: Request, res: Response) {
    try {
      const games = await Game
        .find()
        .populate('genre', 'name')
        .populate('platform', 'name');
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
  
  public async getGame(req: Request, res: Response) {
    const gameId = req.params.id;
    try {
      const game = await Game
        .findOne({ _id: gameId })
        .populate('genre', 'name')
        .populate('platform', 'name');

      if (game) {
        res
          .status(200)
          .json({ message: 'Fetched game', game });
        console.log('✅ FETCHED GAME');
      }
    } catch(err) {
      console.log('❌ ERROR FETCHING GAME');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to fetch game' });
    }
  }

  public async addGame(req: Request, res: Response) {
    const newGame = new Game(req.body);
    try {
      const game = newGame.save();
      if (game) {
        res
          .status(201)
          .json({ message: 'Saved game', game });
        console.log('✅ SAVED GAME');
      }
    } catch(err) {
      console.log('❌ ERROR SAVING GAME');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to save game' });
    }
  }

  public async updateGame(req: Request, res: Response) {
    const gameId = req.params.id;
    try {
      const game = Game.findByIdAndUpdate(gameId, req.body);
      if (game) {
        res
          .status(201)
          .json({ message: 'Updated game', game });
        console.log('✅ UPDATED GAME');
      }
    } catch(err) {
      console.log('❌ ERROR UPDATING GAME');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to update game' });
    }
  }

  public async deleteGame(req: Request, res: Response) {
    const gameId = req.params.id;
    try {
      const game = await Game.findByIdAndDelete(gameId);
      if (game) {
        res
          .status(200)
          .json({ message: `Deleted game ${game.id}`, game });
        console.log('✅ DELETED GAME');
      }
    } catch(err) {
      console.log('❌ ERROR DELETING GAME');
      console.error(err.message);
      res
        .status(500)
        .json({ message: 'Failed to delete game' });
    }
  }
}