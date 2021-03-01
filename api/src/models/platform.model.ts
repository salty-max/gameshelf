import mongoose, { Schema } from 'mongoose';

const PlatformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

export const Platform = mongoose.model("Platform", PlatformSchema);