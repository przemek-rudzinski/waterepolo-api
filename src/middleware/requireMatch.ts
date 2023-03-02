import { Request, Response, NextFunction } from "express";
import { findMatch } from "../service/match.service";

const requireMatch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const matchId = req.body.matchId;
  const match = await findMatch({ matchId });
  if (!match) {
    return res.status(404).send("match not found");
  }

  return next();
};

export default requireMatch;
