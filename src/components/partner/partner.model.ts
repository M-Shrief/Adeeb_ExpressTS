import mongoose from 'mongoose';
// Types
import { PartnerType } from '../../interfaces/partner.interface';
const Schema = mongoose.Schema;

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String || Array<string>,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Partner = mongoose.model<PartnerType>('Partner', partnerSchema);
export default Partner;
