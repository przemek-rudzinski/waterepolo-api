import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import MatchModel, { MatchDocument, MatchInput } from "../models/match.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createMatch(input: MatchInput) {
  const metricsLabels = {
    operation: "createMatch",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await MatchModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findMatch(
  query: FilterQuery<MatchDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findMatch",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await MatchModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateMatch(
  query: FilterQuery<MatchDocument>,
  update: UpdateQuery<MatchDocument>,
  options: QueryOptions
) {
  return MatchModel.findOneAndUpdate(query, update, options);
}

export async function deleteMatch(query: FilterQuery<MatchDocument>) {
  return MatchModel.deleteOne(query);
}
