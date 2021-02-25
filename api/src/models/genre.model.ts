import mongoose, { Mongoose } from 'mongoose';
import { Game } from './game.model';

const GenreSchema = new mongoose.Schema({
  name: String,
})

export const Genre = mongoose.model("Genre", GenreSchema);