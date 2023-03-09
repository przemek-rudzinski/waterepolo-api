import { Express, Request, Response } from "express";
import {
  createMatchSchema,
  deleteMatchSchema,
  getMatchSchema,
  updateMatchSchema,
} from "../schema/match.schema";
import validateResource from "../middleware/validateResource";
import {
  createMatchHandler,
  deleteMatchHandler,
  getMatchHandler,
  getAllMatchesHandler,
  updateMatchHandler,
} from "../controller/match.controller";

import requireUser from "../middleware/requireUser";

function matchRoutes(app: Express) {
  app.get("match/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post(
    "/api/match",
    requireUser,
    [validateResource(createMatchSchema)],
    createMatchHandler
  );

  app.get("/api/match/all", requireUser, getAllMatchesHandler);

  app.get(
    "/api/match/:matchId",
    requireUser,
    [validateResource(getMatchSchema)],
    getMatchHandler
  );

  app.patch(
    "/api/match/:matchId",
    requireUser,
    [validateResource(updateMatchSchema)],
    updateMatchHandler
  );
  app.delete(
    "/api/match/:matchId",
    requireUser,
    [validateResource(deleteMatchSchema)],
    deleteMatchHandler
  );
}

export default matchRoutes;
