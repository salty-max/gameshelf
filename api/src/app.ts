import fs from 'fs';
import path from 'path';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import AuthRouter from './routers/auth.router';
import GameRouter from './routers/game.router';
import GenreRouter from './routers/genre.router';
import PlatformRouter from './routers/platform.router';
import MainRouter from './routers/main.router';
import { verifyToken } from './validations/token.validation';

class App {
  public app: Application;
  private accessLogStream: fs.WriteStream;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setRoutes();
    this.accessLogStream = fs.createWriteStream(
      path.join(__dirname, 'logs', 'access.log'),
      { flags: 'a' }
    );
  }

  private setRoutes() {
    this.app.use('/api', MainRouter);
    this.app.use('/api/auth', AuthRouter);
    this.app.use('/api/games', GameRouter);
    this.app.use('/api/genres', GenreRouter);
    this.app.use('/api/platforms', PlatformRouter);
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