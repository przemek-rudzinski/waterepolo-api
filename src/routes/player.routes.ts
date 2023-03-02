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
import requireUser from "../middleware/requireUser";

function playerRoutes(app: Express) {
  app.get("player/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post(
    "/api/player",
    requireUser,
    [validateResource(createPlayerSchema)],
    createPlayerHandler
  );
  app.get(
    "/api/player/:playerId",
    requireUser,
    [validateResource(getPlayerSchema)],
    getPlayerHandler
  );

  app.patch(
    "/api/player/:playerId",
    requireUser,
    [validateResource(updatePlayerSchema)],
    updatePlayerHandler
  );
  app.delete(
    "/api/player/:playerId",
    requireUser,
    [validateResource(deletePlayerSchema)],
    deletePlayerHandler
  );
}

export default playerRoutes;
