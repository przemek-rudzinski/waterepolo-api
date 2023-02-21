import { Express, Request, Response } from "express";
import { createPlayerMatchSchema } from "../schema/player-match.schema";
import validateResource from "../middleware/validateResource";
import { createPlayerMatchHandler } from "../controller/player-match.controller";

function playerMatchRoutes(app: Express) {
  app.post(
    "/api/player-match",
    [validateResource(createPlayerMatchSchema)],
    createPlayerMatchHandler
  );
}

export default playerMatchRoutes;
