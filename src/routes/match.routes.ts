import { Express, Request, Response } from "express";
import { createMatchSchema } from "../schema/match.schema";
import validateResource from "../middleware/validateResource";
import { createMatchHandler } from "../controller/match.controller";

function matchRoutes(app: Express) {
  app.get("match/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post(
    "/api/match",
    [validateResource(createMatchSchema)],
    createMatchHandler
  );
}

export default matchRoutes;
