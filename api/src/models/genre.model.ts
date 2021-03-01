import mongoose, { Schema } from 'mongoose';
import { Game } from './game.model';

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game",
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

export const Genre = mongoose.model("Genre", GenreSchema);