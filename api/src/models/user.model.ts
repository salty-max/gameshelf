import mongoose, { Schema } from 'mongoose';

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

export const User = mongoose.model("User", UserSchema);