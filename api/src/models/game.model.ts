import mongoose, { Schema } from 'mongoose';

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: Schema.Types.ObjectId,
    ref: 'Platform',
    required: true,
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  platinum: {
    type: Boolean,
    default: false,
  },
  now_playing: {
    type: Boolean,
    default: false,
  },
  releaseDate: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

export const Game = mongoose.model("Game", GameSchema);