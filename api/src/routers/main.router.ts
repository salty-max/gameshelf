import { Request, Response, Router } from 'express';

const MainRouter = Router();

MainRouter.get('/', (req: Request, res: Response) => res.status(200).send('Welcome to the sample API 👋'));

export default MainRouter;