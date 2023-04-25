import { Schema } from "mongoose";

export interface Turnover {
  playTurnover?: number;
  foulTurnover?: number;
  powerPlayTurnover?: number;
}

export const TurnoverSchema = new Schema(
  {
    playTurnover: { type: Number, default: 0 },
    foulTurnover: { type: Number, default: 0 },
    powerPlayTurnover: { type: Number, default: 0 },
  },
  { _id: false }
);
