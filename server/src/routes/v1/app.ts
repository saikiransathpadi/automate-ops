import { Router } from "express";
import { testRoute } from "../../controller";
import { authenticatedRouter } from "../../middleware/auth";

const appRouter = Router();

appRouter
  .route("/test")
  .get(authenticatedRouter, testRoute)

export default appRouter;
