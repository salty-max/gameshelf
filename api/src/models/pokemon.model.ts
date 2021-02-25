import mongoose, { Mongoose } from 'mongoose';

const PokemonSchema = new mongoose.Schema({
  name: String,
  type: String,
  height: Number,
  weight: Number,
  thumb: String
})

export const Pokemon = mongoose.model("Pokemon", PokemonSchema);