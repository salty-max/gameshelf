import { Request, Response, Router } from 'express';
import { Platform } from '../models/platform.model';

const PlatformRouter = Router();

PlatformRouter.get('/', async (req: Request, res: Response) => {
  try {
    const platforms = await Platform.find();
    if (platforms) {
      res
        .status(200)
        .json({ message: 'Fetched platforms', platforms });
      console.log('✅ FETCHED PLATFORMS');
    }
  } catch (err) {
    console.log('❌ ERROR FETCHING PLATFORMS');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to fetch platforms' });
  }
});

PlatformRouter.post('/', async (req: Request, res: Response) => {
  const newPlatform = new Platform(req.body);

  try {
    const platform = await newPlatform.save();
    if (platform) {
      res
        .status(201)
        .json({ message: 'Platform saved', platform });
      console.log('✅ STORED NEW PLATFORM');
    }
  } catch (err) {
    console.log('❌ ERROR SAVING PLATFORM');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to save platform' })
  }
});

PlatformRouter.put('/:id', async (req: Request, res: Response) => {
  const platformId = req.params.id;

  try {
    const platform = await Platform.findByIdAndUpdate(platformId, req.body);

    if (platform) {
      res
        .status(201)
        .json({ message: 'Platform updated', platform });
      console.log('✅ UPDATED PLATFORM');
    }
  } catch (err) {
    console.log('❌ ERROR UPDATING PLATFORM');
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to update platform' })

  }
});

PlatformRouter.delete('/:id', async (req: Request, res: Response) => {
  const platformId = req.params.id;

  try {
    const platform = await Platform.findByIdAndDelete(platformId);
    if (platform) {
      res
        .status(200)
        .json({ message: `Deleted platform ${platform.id}` });
      console.log('✅ DELETED PLATFORM')
    }
  } catch (err) {
    console.log('❌ ERROR DELETING PLATFORM')
    console.error(err.message);
    res
      .status(500)
      .json({ message: 'Failed to delete platform' })
  }
});

export default PlatformRouter;