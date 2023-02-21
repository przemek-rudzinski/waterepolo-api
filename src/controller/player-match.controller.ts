import { Request, Response } from "express";
import { CreatePlayerMatchInput } from "../schema/player-match.schema";
import { findPlayer } from "../service/player.service";
import { createPlayerMatch } from "../service/player-match.service";

export async function createPlayerMatchHandler(
  req: Request<{}, {}, CreatePlayerMatchInput["body"]>,
  res: Response
) {
  const body = req.body;

  const playerId = body.playerId;
  const player = await findPlayer({ playerId });

  if (!player) {
    return res.status(404).send("player not found");
  }

  const matchId = body.matchId;
  const match = await findPlayer({ matchId });
  if (!match) {
    return res.status(404).send("match not found");
  }

  const playerMatch = await createPlayerMatch({
    ...body,
    playerName: player.name,
    playerNumber: player.number,
  });

  return res.send(playerMatch);
}
