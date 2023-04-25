import { Schema } from "mongoose";

export interface Defense {
  block?: number;
  interception?: number;
  exclusionFoul?: number;
  penaltyFoul?: number;
  defensiveCollapse?: number;
}

export const DefenseSchema = new Schema(
  {
    block: { type: Number, default: 0 },
    exclusionFoul: { type: Number, default: 0 },
    penaltyFoul: { type: Number, default: 0 },
    interception: { type: Number, default: 0 },
    defensiveCollapse: { type: Number, default: 0 },
  },
  { _id: false }
);
