import mongoose from 'mongoose';
// Types
import { PoetType } from '../../interfaces/poet.interface';

const Schema = mongoose.Schema;
const poetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    time_period: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 50 },
    },
    bio: {
      type: String,
      required: true,
      length: { minlength: 4, maxlength: 500 },
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Poet = mongoose.model<PoetType['details']>('Poet', poetSchema);
