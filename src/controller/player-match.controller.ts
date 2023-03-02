import { Request, Response } from "express";
import {
  CreatePlayerMatchInput,
  ReadPlayerMatchInput,
  DeletePlayerMatchInput,
  UpdatePlayerMatchInput,
  SearchPlayerMatchInput,
} from "../schema/player-match.schema";
import { findPlayer } from "../service/player.service";
import {
  createPlayerMatch,
  deletePlayerMatch,
  findAndUpdatePlayerMatch,
  findManyPlayerMatch,
  findPlayerMatch,
} from "../service/player-match.service";

export async function searchPlayerMatchHandler(
  req: Request<SearchPlayerMatchInput>,
  res: Response
) {
  const query = req.query;

  console.log(query.onField);
  let playerMatches: any[] = [];
  if (query.onField == "true" || query.onField === "1") {
    console.log("here");
    playerMatches = await findManyPlayerMatch({
      ...query,
      onField: true,
    });
  }
  if (query.onField == "false" || query.onField === "0") {
    console.log("here false");
    playerMatches = await findManyPlayerMatch({
      ...query,
      onField: false,
    });
  }
  if (!query.onField) {
    console.log("here nothing");
    playerMatches = await findManyPlayerMatch({ query });
  }

  if (playerMatches.length == 0 || !playerMatches) {
    return res.status(404).send("Player Matches not found");
  }

  return res.send(playerMatches);
}

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

  const playerMatch = await createPlayerMatch({
    ...body,
    playerName: player.name,
    playerNumber: player.number,
  });

  return res.send(playerMatch);
}

export async function getPlayerMatchHandler(
  req: Request<ReadPlayerMatchInput["params"]>,
  res: Response
) {
  const playerMatchId = req.params.playerMatchId;
  const playerMatch = await findPlayerMatch({ playerMatchId });

  console.log(playerMatch);
  if (!playerMatch) {
    return res.sendStatus(404);
  }

  return res.send(playerMatch);
}

export async function updatePlayerMatchHandler(
  req: Request<UpdatePlayerMatchInput["params"]>,
  res: Response
) {
  const playerMatchId = req.params.playerMatchId;
  const update = req.body;

  const playerMatch = await findPlayerMatch({ playerMatchId });

  if (!playerMatch) {
    return res.sendStatus(404);
  }

  const updatedPlayerMatch = await findAndUpdatePlayerMatch(
    { playerMatchId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedPlayerMatch);
}

export async function deletePlayerMatchHandler(
  req: Request<DeletePlayerMatchInput["params"]>,
  res: Response
) {
  const playerMatchId = req.params.playerMatchId;

  const playerMatch = await findPlayerMatch({ playerMatchId });

  if (!playerMatch) {
    return res.sendStatus(404);
  }

  await deletePlayerMatch({ playerMatchId });

  return res.sendStatus(200);
}
