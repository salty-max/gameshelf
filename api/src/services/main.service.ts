import { Request, Response } from 'express';

import { Pokemon } from '../models/pokemon.model';

export class MainService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send('Welcome to the sample API 👋');
  }
}