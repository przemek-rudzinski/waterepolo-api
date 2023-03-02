import { Express, Request, Response } from "express";
import {
  createPlayerMatchSchema,
  getPlayerMatchSchema,
  updatePlayerMatchSchema,
  deletePlayerMatchSchema,
  searchManyPlayerMatchSchema,
} from "../schema/player-match.schema";
import validateResource from "../middleware/validateResource";
import {
  createPlayerMatchHandler,
  getPlayerMatchHandler,
  updatePlayerMatchHandler,
  deletePlayerMatchHandler,
  searchPlayerMatchHandler,
} from "../controller/player-match.controller";
import requireMatch from "../middleware/requireMatch";
import requireUser from "../middleware/requireUser";

function playerMatchRoutes(app: Express) {
  app.post(
    "/api/player-match",
    requireUser,
    [validateResource(createPlayerMatchSchema)],
    requireMatch,
    createPlayerMatchHandler
  );
  app.get(
    "/api/player-match/all",
    requireUser,
    [validateResource(searchManyPlayerMatchSchema)],
    searchPlayerMatchHandler
  );
  app.get(
    "/api/player-match/:playerMatchId",
    requireUser,
    [validateResource(getPlayerMatchSchema)],
    getPlayerMatchHandler
  );
  app.put(
    "/api/player-match/:playerMatchId",
    requireUser,
    [validateResource(updatePlayerMatchSchema)],
    updatePlayerMatchHandler
  );
  app.delete(
    "/api/player-match/:playerMatchId",
    requireUser,
    [validateResource(deletePlayerMatchSchema)],
    deletePlayerMatchHandler
  );
}

export default playerMatchRoutes;
