import { Request, Response } from "express";
import { CreateMatchInput, UpdateMatchInput } from "../schema/match.schema";
import {
  createMatch,
  deleteMatch,
  findAndUpdateMatch,
  findMatch,
} from "../service/match.service";

export async function createMatchHandler(
  req: Request<{}, {}, CreateMatchInput["body"]>,
  res: Response
) {
  const body = req.body;

  const match = await createMatch(body);

  return res.send(match);
}
