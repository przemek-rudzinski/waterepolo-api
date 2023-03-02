import { Request, Response, NextFunction } from "express";
import { findPlayer } from "../service/player.service";

const requirePlayer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const playerId = req.body.playerId;
  const player = await findPlayer({ playerId });
  if (!player) {
    return res.status(404).send("player not found");
  }
  req.body.player = player;
  return next();
};

export default requirePlayer;
