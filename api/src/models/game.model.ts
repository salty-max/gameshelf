import mongoose, { Schema, Document, Types } from 'mongoose';

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  release_date: Date,
  created_at: {
    type: Date,
    default: Date.now(),
  }
})

export interface IGame extends Document {
  _id: string;
  name: string;
  platform: Types.ObjectId;
  genre: Types.ObjectId;
  owner: Types.ObjectId;
  completed: boolean;
  platinum: boolean;
  now_playing: boolean;
  release_date: boolean;
}

export const Game = mongoose.model<IGame>("Game", GameSchema);