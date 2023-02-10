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
  updateMatchHandler,
} from "../controller/match.controller";

function matchRoutes(app: Express) {
  app.get("match/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post(
    "/api/match",
    [validateResource(createMatchSchema)],
    createMatchHandler
  );
  app.get(
    "/api/match/:matchId",
    [validateResource(getMatchSchema)],
    getMatchHandler
  );

  app.patch(
    "/api/match/:matchId",
    [validateResource(updateMatchSchema)],
    updateMatchHandler
  );
  app.delete(
    "/api/match/:matchId",
    [validateResource(deleteMatchSchema)],
    deleteMatchHandler
  );
}

export default matchRoutes;
