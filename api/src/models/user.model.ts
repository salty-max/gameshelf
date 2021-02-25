import mongoose, { Schema, Document, Types } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }]
});

export interface IUser extends Document {
  _id: string,
  username: string,
  email: string,
  password: string,
  createdAt: Date,
  games?: Array<Types.ObjectId>
}

export const User = mongoose.model<IUser>("User", UserSchema);