import { Request, Response, Router } from 'express';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { addGameValidation, editGameValidation } from '../validations/game.validation';

const GameRouter = Router();

/**
 * @route GET /api/games
 * @desc Get logged in user games
 * @access Private
 */
GameRouter.get('/', async (req: Request, res: Response) => {
  try {
    const games = await Game
      .find({ owner: req.user.id })
      .populate('genres', { name: 1 })
      .populate('platforms', { name: 1 })
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

/**
 * @route GET /api/games/:id
 * @desc Get a user's game by id
 * @access Private
 */
GameRouter.get('/:id', async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    const game = await Game
      .findOne({ _id: gameId, owner: req.user.id })
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

/**
 * @route POST /api/games/
 * @desc Add a game
 * @access Private
 */
GameRouter.post('/', async (req: Request, res: Response) => {
  const { error } = addGameValidation(req.body);
  
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => ({ 
      field: e.context?.key,
      message: e.message
    })) });
  }

  try {
  
    const owner = await User.findById(req.user.id);

    if (!owner) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { 
      name,
      genres,
      platforms,
      completed,
      platinum,
      now_playing,
      release_date,
      cover
    } = req.body;

    const newGame = new Game({
      name,
      genres,
      platforms,
      completed,
      platinum,
      now_playing,
      release_date,
      cover,
      owner: req.user.id
    });
  
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

/**
 * @route PUT /api/games/:id
 * @desc Edit a game
 * @access Private
 */
GameRouter.put('/:id', async (req: Request, res: Response) => {
  const gameId = req.params.id;

  const { error } = editGameValidation(req.body);
  
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => ({ 
      field: e.context?.key,
      message: e.message
    })) });
  }

  try {
    let game = await Game.findById(gameId);
    if (!game) res.status(404).json({ message: 'Game not found' });

    if (String(game?.owner) !== req.user.id) res.status(401).json({ message: 'Unauthorized' });

    game = await Game.findByIdAndUpdate(gameId, req.body);

    res
      .status(201)
      .json({ message: 'Updated game', game });
    console.log('✅ UPDATED GAME');
  } catch (err) {
    console.log('❌ ERROR UPDATING GAME');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to update game' });
  }
});

/**
 * @route DELETE /api/games/:id
 * @desc Delete a game
 * @access Private
 */
GameRouter.delete('/:id', async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    let game = await Game.findById(gameId);
    if (!game) res.status(404).json({ message: 'Game not found' });

    if (String(game?.owner) !== req.user.id) res.status(401).json({ message: 'Unauthorized' });

    game = await Game.findByIdAndDelete(gameId);
    res
      .status(200)
      .json({ message: `Deleted game ${game?.id}`, game });
    console.log('✅ DELETED GAME');
  } catch (err) {
    console.log('❌ ERROR DELETING GAME');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to delete game' });
  }
});

export default GameRouter;