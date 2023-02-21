import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PlayerMatchModel, {
  PlayerMatchDocument,
  PlayerMatchInput,
} from "../models/player-match.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createPlayerMatch(input: PlayerMatchInput) {
  const metricsLabels = {
    operation: "createPlayerMatch",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlayerMatchModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findPlayerMatch(
  query: FilterQuery<PlayerMatchDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findPlayerMatch",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlayerMatchModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdatePlayerMatch(
  query: FilterQuery<PlayerMatchDocument>,
  update: UpdateQuery<PlayerMatchDocument>,
  options: QueryOptions
) {
  return PlayerMatchModel.findOneAndUpdate(query, update, options);
}

export async function deletePlayerMatch(
  query: FilterQuery<PlayerMatchDocument>
) {
  return PlayerMatchModel.deleteOne(query);
}
