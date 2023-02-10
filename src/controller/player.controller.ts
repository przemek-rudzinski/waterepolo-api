import { Request, Response } from "express";
import {
  CreatePlayerInput,
  DeletePlayerInput,
  ReadPlayerInput,
  UpdatePlayerInput,
} from "../schema/player.schema";
import {
  createPlayer,
  deletePlayer,
  findAndUpdatePlayer,
  findPlayer,
} from "../service/player.service";

export async function createPlayerHandler(
  req: Request<{}, {}, CreatePlayerInput["body"]>,
  res: Response
) {
  const body = req.body;

  const player = await createPlayer(body);

  return res.send(player);
}

export async function getPlayerHandler(
  req: Request<ReadPlayerInput["params"]>,
  res: Response
) {
  const playerId = req.params.playerId;
  const player = await findPlayer({ playerId });

  if (!player) {
    return res.sendStatus(404);
  }

  return res.send(player);
}

export async function updatePlayerHandler(
  req: Request<UpdatePlayerInput["params"]>,
  res: Response
) {
  const playerId = req.params.playerId;
  const update = req.body;

  const player = await findPlayer({ playerId });

  if (!player) {
    return res.sendStatus(404);
  }

  const updatedPlayer = await findAndUpdatePlayer({ playerId }, update, {
    new: true,
  });

  return res.send(updatedPlayer);
}

export async function deletePlayerHandler(
  req: Request<DeletePlayerInput["params"]>,
  res: Response
) {
  const playerId = req.params.playerId;

  const player = await findPlayer({ playerId });

  if (!player) {
    return res.sendStatus(404);
  }

  await deletePlayer({ playerId });

  return res.sendStatus(200);
}
