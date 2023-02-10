import { Request, Response } from "express";
import {
  CreateMatchInput,
  DeleteMatchInput,
  ReadMatchInput,
  UpdateMatchInput,
} from "../schema/match.schema";
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

export async function getMatchHandler(
  req: Request<ReadMatchInput["params"]>,
  res: Response
) {
  const matchId = req.params.matchId;
  const match = await findMatch({ matchId });

  if (!match) {
    return res.sendStatus(404);
  }

  return res.send(match);
}

export async function updateMatchHandler(
  req: Request<UpdateMatchInput["params"]>,
  res: Response
) {
  const matchId = req.params.matchId;
  const update = req.body;

  const match = await findMatch({ matchId });

  if (!match) {
    return res.sendStatus(404);
  }

  const updatedMatch = await findAndUpdateMatch({ matchId }, update, {
    new: true,
  });

  return res.send(updatedMatch);
}

export async function deleteMatchHandler(
  req: Request<DeleteMatchInput["params"]>,
  res: Response
) {
  const matchId = req.params.matchId;

  const match = await findMatch({ matchId });

  if (!match) {
    return res.sendStatus(404);
  }

  await deleteMatch({ matchId });

  return res.sendStatus(200);
}
