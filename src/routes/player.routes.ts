import { Express, Request, Response } from "express";
import {
  createPlayerSchema,
  deletePlayerSchema,
  getPlayerSchema,
  updatePlayerSchema,
} from "../schema/player.schema";
import validateResource from "../middleware/validateResource";
import {
  createPlayerHandler,
  deletePlayerHandler,
  getPlayerHandler,
  updatePlayerHandler,
} from "../controller/player.controller";

function playerRoutes(app: Express) {
  app.get("player/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post(
    "/api/player",
    [validateResource(createPlayerSchema)],
    createPlayerHandler
  );
  app.get(
    "/api/player/:playerId",
    [validateResource(getPlayerSchema)],
    getPlayerHandler
  );

  app.patch(
    "/api/player/:playerId",
    [validateResource(updatePlayerSchema)],
    updatePlayerHandler
  );
  app.delete(
    "/api/player/:playerId",
    [validateResource(deletePlayerSchema)],
    deletePlayerHandler
  );
}

export default playerRoutes;
