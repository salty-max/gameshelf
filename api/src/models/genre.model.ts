import mongoose, { Schema, Document } from 'mongoose';

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })

export interface IGenre extends Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Genre = mongoose.model<IGenre>("Genre", GenreSchema);