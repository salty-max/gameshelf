import { string } from '@hapi/joi';
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
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
      required: true,
    }
  ],
  developers: [
    {
      type: String,
    }
  ],
  editors: [
    {
      type: String,
    }
  ],
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
  nowPlaying: {
    type: Boolean,
    default: false,
  },
  physical: {
    type: Boolean,
    default: false,
  },
  releaseDate: Date,
  cover: {
    type: String
  }
}, { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })

export interface IGame extends Document {
  _id: string;
  name: string;
  platform: Types.ObjectId;
  genres: Types.ObjectId[];
  developers: string[];
  editors: string[];
  owner: Types.ObjectId;
  completed: boolean;
  platinum: boolean;
  nowPlaying: boolean;
  physical: Boolean;
  releaseDate: boolean;
  cover: string;
}

export const Game = mongoose.model<IGame>("Game", GameSchema);