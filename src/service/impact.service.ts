import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ImpactModel, { ImpactDocument, ImpactInput } from "../models/impact.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createImpact(input: ImpactInput) {
  const metricsLabels = {
    operation: "createImpact",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ImpactModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findAllImpactes(
  query: FilterQuery<ImpactDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findAllImpact",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ImpactModel.find(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findImpact(
  query: FilterQuery<ImpactDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findImpact",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ImpactModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
}

export async function findAndUpdateImpact(
  query: FilterQuery<ImpactDocument>,
  update: UpdateQuery<ImpactDocument>,
  options: QueryOptions
) {
  return ImpactModel.findOneAndUpdate(query, update, options);
}

export async function deleteImpact(query: FilterQuery<ImpactDocument>) {
  return ImpactModel.deleteOne(query);
}
