import fs from 'fs';
import path from 'path';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { Controller } from './controllers/main.controller';
import { GameController } from './controllers/game.controller';
import { PlatformController } from './controllers/platform.controller';
import { GenreController } from './controllers/genre.controller';
import { AuthController } from './controllers/auth.controller';

class App {
  public app: Application;
  private accessLogStream: fs.WriteStream;
  public mainController: Controller;
  public gameController: GameController;
  public platformController: PlatformController;
  public genreController: GenreController;
  public authController: AuthController;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.accessLogStream = fs.createWriteStream(
      path.join(__dirname, 'logs', 'access.log'),
      { flags: 'a' }
    );
    this.mainController = new Controller(this.app);
    this.gameController = new GameController(this.app);
    this.platformController = new PlatformController(this.app);
    this.genreController = new GenreController(this.app);
    this.authController = new AuthController(this.app);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
    this.app.use(morgan('combined', { stream: this.accessLogStream }));
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_DATABASE}?authSource=admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error('FAILED TO CONNECT TO MONGODB');
        console.error(err);
      } else {
        console.log('CONNECTED TO MONGODB');
      }
    });
  }
}

export default new App().app;