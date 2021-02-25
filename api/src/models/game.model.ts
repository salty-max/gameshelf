import mongoose, { Schema } from 'mongoose';
import { Genre } from './genre.model';
import { Platform } from './platform.model';

const GameSchema = new mongoose.Schema({
  name: String,
  platform: {
    type: Schema.Types.ObjectId,
    ref: 'Platform'
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre'
  },
  completed: Boolean,
  platinum: Boolean,
  nowPlaying: Boolean,
  releaseDate: Date
})

export const Game = mongoose.model("Game", GameSchema);