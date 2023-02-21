import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

export interface PlayerMatchInput {
  playerNumber: number;
  playerId: string;
  matchId: string;
  playerName: string;
  onField?: boolean | undefined;
}

export interface PlayerMatchDocument
  extends PlayerMatchInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const playerMatchSchema = new mongoose.Schema(
  {
    playerName: { type: String, required: true },
    playerNumber: { type: Number, required: true },
    playingTime: { type: Number },
    onField: { type: Boolean, default: false },
    entryTime: { type: [String], default: [] },
    exitTime: { type: [String], default: [] },
    playerId: { type: String, required: true },
    matchId: { type: String, required: true },
    playerMatchId: {
      type: String,
      required: true,
      unique: true,
      default: () => `playerMatch_${nanoid()}`,
    },
  },
  {
    timestamps: true,
  }
);

const PlayerMatchModel = mongoose.model<PlayerMatchDocument>(
  "Player-Match",
  playerMatchSchema
);

export default PlayerMatchModel;
