import { Schema } from "mongoose";

export interface Impact {
  sprint: number;
  assist: number;
  penalty: number;
  exclusion: number;
}

export const ImpactSchema = new Schema(
  {
    sprint: { type: Number, default: 0 },
    assist: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 },
    exclusion: { type: Number, default: 0 },
  },
  { _id: false }
);
