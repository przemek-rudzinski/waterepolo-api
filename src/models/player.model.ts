import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

export interface PlayerInput {
  name: string;
  number: number;
  isGoalkeeper: boolean;
}

export interface PlayerDocument extends PlayerInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const playerSchema = new mongoose.Schema(
  {
    playerId: {
      type: String,
      required: true,
      unique: true,
      default: () => `player_${nanoid()}`,
    },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    isGoalkeeper: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const PlayerModel = mongoose.model<PlayerDocument>("Player", playerSchema);

export default PlayerModel;
