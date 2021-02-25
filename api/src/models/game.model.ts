import mongoose from 'mongoose';
import { Genre } from './genre.model';
import { Platform } from './platform.model';

const GameSchema = new mongoose.Schema({
  name: String,
  platform_id: String,
  genre_id: String,
  completed: Boolean,
  platinum: Boolean,
  nowPlaying: Boolean,
  releaseDate: Date
})

export const Game = mongoose.model("Game", GameSchema);