import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

export interface ImpactInput { 
  sprint?: number | undefined;  
  assist?: number | undefined;
  penalty?: number | undefined;
  exclusion?: number | undefined;
  playerMatchId: string;
}

export interface ImpactDocument extends ImpactInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const impactSchema = new mongoose.Schema(
  {    
    impactId: {
      type: String,
      required: true,
      unique: true,
      default: () => `impact_${nanoid()}`,
    },
    sprint: { type: Number, default: 0 },  
    assist: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 },
    exclusion: { type: Number, default: 0 },
    playerMatchId:  { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InputModel = mongoose.model<ImpactDocument>("Impact", impactSchema);

export default InputModel;
