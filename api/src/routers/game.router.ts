import { Request, Response, Router } from 'express';
import { Game } from '../models/game.model';
import { addGameValidation } from '../validations/game.validation';

const GameRouter = Router();

GameRouter.get('/', async (req: Request, res: Response) => {
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
  } catch (err) {
    console.log('❌ ERROR FETCHING GAMES');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to fetch games' });
  }
});

GameRouter.get('/:id', async (req: Request, res: Response) => {
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
  } catch (err) {
    console.log('❌ ERROR FETCHING GAME');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to fetch game' });
  }
});

GameRouter.post('/', async (req: Request, res: Response) => {
  const { error } = addGameValidation(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const newGame = new Game(req.body);
  
  try {
    const game = newGame.save();
    if (game) {
      res
        .status(201)
        .json({ message: 'Saved game', game });
      console.log('✅ SAVED GAME');
    }
  } catch (err) {
    console.log('❌ ERROR SAVING GAME');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to save game' });
  }
});

GameRouter.put('/:id', async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    const game = Game.findByIdAndUpdate(gameId, req.body);
    if (game) {
      res
        .status(201)
        .json({ message: 'Updated game', game });
      console.log('✅ UPDATED GAME');
    }
  } catch (err) {
    console.log('❌ ERROR UPDATING GAME');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to update game' });
  }
});

GameRouter.delete('/:id', async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findByIdAndDelete(gameId);
    if (game) {
      res
        .status(200)
        .json({ message: `Deleted game ${game.id}`, game });
      console.log('✅ DELETED GAME');
    }
  } catch (err) {
    console.log('❌ ERROR DELETING GAME');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to delete game' });
  }
});

export default GameRouter;