import mongoose, { Schema, Document } from 'mongoose';

const PlatformSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
}, { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } })

export interface IPlatform extends Document {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const Platform = mongoose.model<IPlatform>("Platform", PlatformSchema);