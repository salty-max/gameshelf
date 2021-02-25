import { Request, Response } from 'express';

export class MainService {
  public welcomeMessage(req: Request, res: Response) {
    return res.status(200).send('Welcome to the sample API 👋');
  }
}