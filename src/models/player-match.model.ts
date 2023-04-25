import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { Impact, ImpactSchema } from "../types/impact.types";
import { Turnover, TurnoverSchema } from "../types/turnover.types";
import { Defense, DefenseSchema } from "../types/defense.types";
import { Shot, ShotSchema } from "../types/shot.types";

export interface PlayerMatchInput {
  playerNumber: number;
  playerId: string;
  isGoalkeeper: boolean;
  matchId: string;
  playerName: string;
  onField?: boolean | undefined;
  impact?: Impact;
  turnover?: Turnover;
  defense?: Defense;
  shot?: Shot;
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
    isGoalkeeper: { type: Boolean, required: true },
    playingTime: { type: Number },
    onField: { type: Boolean, default: false },
    entryTime: { type: [String], default: [] },
    exitTime: { type: [String], default: [] },
    impact: {
      type: ImpactSchema,
      default: { sprint: 0, assist: 0, penalty: 0, exclusion: 0 },
    },
    turnover: {
      type: TurnoverSchema,
      default: {
        playTurnover: 0,
        foulTurnover: 0,
        powerPlayTurnover: 0,
      },
    },
    defense: {
      type: DefenseSchema,
      default: {
        block: 0,
        interception: 0,
        exclusion: 0,
        penaltyFoul: 0,
        defensiveCollapse: 0,
      },
    },
    shot: {
      type: ShotSchema,
      default: {
        fieldGoal: 0,
        fieldTarget: 0,
        fieldMiss: 0,
        penaltyGoal: 0,
        penaltyTarget: 0,
        penaltyMiss: 0,
        centerGoal: 0,
        centerTarget: 0,
        centerMiss: 0,
        powerPlayShot: 0,
        powerPlayTarget: 0,
        powerPlayMiss: 0,
        counterPlayShot: 0,
        counterPlayTarget: 0,
        counterPlayMiss: 0,
      },
    },
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
