import mongoose from "mongoose";
import { customAlphabet } from "nanoid";

export interface MatchInput {
  guestTeam: string;
  homeTeam: string;
  description?: string | undefined;
  place?: string | undefined;
  date?: string | undefined;
  homeScore?: number | undefined;
  guestScore?: number | undefined;
}

export interface MatchDocument extends MatchInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const matchSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
      unique: true,
      default: () => `match_${nanoid()}`,
    },
    guestTeam: { type: String, required: true },
    homeTeam: { type: String, required: true },
    description: { type: String },
    place: { type: String },
    date: { type: String },
    homeScore: { type: Number, default: 0 },
    guestScore: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const MatchModel = mongoose.model<MatchDocument>("Match", matchSchema);

export default MatchModel;
