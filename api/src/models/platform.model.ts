import mongoose, { Mongoose } from 'mongoose';
import { Game } from './game.model';

const PlatformSchema = new mongoose.Schema({
  name: String,
  games: [Game]
})

export const Platform = mongoose.model("Platform", PlatformSchema);