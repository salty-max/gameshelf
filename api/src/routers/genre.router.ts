import { Request, Response, Router } from 'express';
import { Genre } from '../models/genre.model';

const GenreRouter = Router();

GenreRouter.get('/', async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    if (genres) {
      res
        .status(200)
        .json({ message: 'Fetched genres', genres });
      console.log('✅ FETCHED GENRES');
    }
  } catch (err) {
    console.log('❌ ERROR FETCHING GENRES');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to fetch genres' });
  }
});

GenreRouter.post('/', async (req: Request, res: Response) => {
  const newGenre = new Genre(req.body);

  try {
    const genre = await newGenre.save();
    if (genre) {
      res
        .status(201)
        .json({ message: 'Genre saved', genre });
      console.log('✅ STORED NEW GENRE');
    }
  } catch (err) {
    console.log('❌ ERROR SAVING GENRE');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to save genre' })
  }
});

GenreRouter.put('/:id', async (req: Request, res: Response) => {
  const genreId = req.params.id;

  try {
    const genre = await Genre.findByIdAndUpdate(genreId, req.body);

    if (genre) {
      res
        .status(201)
        .json({ message: 'Genre updated', genre });
      console.log('✅ UPDATED GENRE');
    }
  } catch (err) {
    console.log('❌ ERROR UPDATING GENRE');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to update genre' })

  }
});

GenreRouter.delete('/:id', async (req: Request, res: Response) => {
  const genreId = req.params.id;

  try {
    const genre = await Genre.findByIdAndDelete(genreId);
    if (genre) {
      res
        .status(200)
        .json({ message: `Deleted genre ${genre.id}` });
      console.log('✅ DELETED GENRE')
    }
  } catch (err) {
    console.log('❌ ERROR DELETING GENRE')
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to delete genre' })
  }
});

export default GenreRouter;