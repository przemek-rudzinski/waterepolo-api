import { Request, Response } from "express";
import {
  CreateImpactInput,
  DeleteImpactInput,
  ReadImpactInput,
  UpdateImpactInput,
} from "../schema/impact.schema";
import {
  createImpact,
  deleteImpact,
  findAllImpactes,
  findAndUpdateImpact,
  findImpact,
} from "../service/impact.service";
import { findPlayerMatch } from "../service/player-match.service";

export async function createImpactHandler(
  req: Request<{}, {}, CreateImpactInput["body"]>,
  res: Response
) {
  const body = req.body;
  
  const playerMatchId = body.playerMatchId;
  const playerMatch = await findPlayerMatch({ playerMatchId });

  if (!playerMatch) {
    return res.status(404).send("playerMatch not found");
  }

  const impact = await createImpact(body);

  return res.send(impact);
}

export async function getAllImpactesHandler(req: Request, res: Response) {
  const impactes = await findAllImpactes({});

  // console.log({ impactes: impactes });

  if (!impactes || impactes.length == 0) {
    console.log("return");
    return res.sendStatus(404);
  }

  return res.send(impactes);
}

export async function getImpactHandler(
  req: Request<ReadImpactInput["params"]>,
  res: Response
) {
  const impactId = req.params.impactId;
  const impact = await findImpact({ impactId });

  if (!impact) {
    return res.sendStatus(404);
  }

  return res.send(impact);
}

export async function updateImpactHandler(
  req: Request<UpdateImpactInput["params"]>,
  res: Response
) {
  const impactId = req.params.impactId;
  const update = req.body;

  const impact = await findImpact({ impactId });

  if (!impact) {
    return res.sendStatus(404);
  }

  const updatedImpact = await findAndUpdateImpact({ impactId }, update, {
    new: true,
  });

  return res.send(updatedImpact);
}

export async function deleteImpactHandler(
  req: Request<DeleteImpactInput["params"]>,
  res: Response
) {
  const impactId = req.params.impactId;

  const impact = await findImpact({ impactId });

  if (!impact) {
    return res.sendStatus(404);
  }

  await deleteImpact({ impactId });

  return res.sendStatus(200);
}
