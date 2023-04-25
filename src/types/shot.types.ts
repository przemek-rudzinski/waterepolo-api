import { Schema } from "mongoose";

export interface Shot {
  fieldGoal?: number;
  fieldTarget?: number;
  fieldMiss?: number;
  penaltyGoal?: number;
  penaltyTarget?: number;
  penaltyMiss?: number;
  centerGoal?: number;
  centerTarget?: number;
  centerMiss?: number;
  powerPlayShot?: number;
  powerPlayTarget?: number;
  powerPlayMiss?: number;
  counterPlayShot?: number;
  counterPlayTarget?: number;
  counterPlayMiss?: number;
}

export const ShotSchema = new Schema(
  {
    fieldGoal: { type: Number, default: 0 },
    fieldTarget: { type: Number, default: 0 },
    fieldMiss: { type: Number, default: 0 },
    penaltyGoal: { type: Number, default: 0 },
    penaltyTarget: { type: Number, default: 0 },
    penaltyMiss: { type: Number, default: 0 },
    centerGoal: { type: Number, default: 0 },
    centerTarget: { type: Number, default: 0 },
    centerMiss: { type: Number, default: 0 },
    powerPlayShot: { type: Number, default: 0 },
    powerPlayTarget: { type: Number, default: 0 },
    powerPlayMiss: { type: Number, default: 0 },
    counterPlayShot: { type: Number, default: 0 },
    counterPlayTarget: { type: Number, default: 0 },
    counterPlayMiss: { type: Number, default: 0 },
  },
  { _id: false }
);
