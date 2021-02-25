import mongoose, { Schema } from 'mongoose';
import { Game } from './game.model';

const GenreSchema = new mongoose.Schema({
  name: String,
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }]
})

export const Genre = mongoose.model("Genre", GenreSchema);