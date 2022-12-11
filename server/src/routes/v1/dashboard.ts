import { Router } from "express";
import { testRoute } from "../../controller";
import { authenticatedRouter } from "../../middleware/auth";

const dashboardRouter = Router();

dashboardRouter
  .route("/test/:id")
  .get(authenticatedRouter, testRoute)

export default dashboardRouter;
