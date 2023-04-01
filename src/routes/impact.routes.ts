import { Express, Request, Response } from "express";
import {
  createImpactSchema,
  deleteImpactSchema,
  getImpactSchema,
  updateImpactSchema,
} from "../schema/impact.schema";
import validateResource from "../middleware/validateResource";
import {
  createImpactHandler,
  deleteImpactHandler,
  getImpactHandler,
  updateImpactHandler,
} from "../controller/impact.controller";
import requireUser from "../middleware/requireUser";

function impactRoutes(app: Express) {
  app.get("impact/healthcheck", (req: Request, res: Response) =>
    res.sendStatus(200)
  );

  app.post(
    "/api/impact",
    requireUser,
    [validateResource(createImpactSchema)],
    createImpactHandler
  );
  app.get(
    "/api/impact/:impactId",
    requireUser,
    [validateResource(getImpactSchema)],
    getImpactHandler
  );

  app.patch(
    "/api/impact/:impactId",
    requireUser,
    [validateResource(updateImpactSchema)],
    updateImpactHandler
  );
  app.delete(
    "/api/impact/:impactId",
    requireUser,
    [validateResource(deleteImpactSchema)],
    deleteImpactHandler
  );
}

export default impactRoutes;
