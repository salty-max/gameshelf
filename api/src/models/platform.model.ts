import mongoose, { Schema } from 'mongoose';

const PlatformSchema = new mongoose.Schema({
  name: String,
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }]
})

export const Platform = mongoose.model("Platform", PlatformSchema);