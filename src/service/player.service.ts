import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import PlayerModel, {
  PlayerDocument,
  PlayerInput,
} from "../models/player.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import { number } from "zod";

export async function createPlayer(input: PlayerInput) {
  const metricsLabels = {
    operation: "createPlayer",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlayerModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findPlayer(
  query: FilterQuery<PlayerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findplayer",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlayerModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAllPlayers(
  query: FilterQuery<PlayerDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findAllPlayer",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await PlayerModel.find(query, {}, options).sort({
      number: 1,
    });
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdatePlayer(
  query: FilterQuery<PlayerDocument>,
  update: UpdateQuery<PlayerDocument>,
  options: QueryOptions
) {
  return PlayerModel.findOneAndUpdate(query, update, options);
}

export async function deletePlayer(query: FilterQuery<PlayerDocument>) {
  return PlayerModel.deleteOne(query);
}
