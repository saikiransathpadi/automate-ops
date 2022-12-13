import { Router } from "express";
import { createUser } from "../../controller";
import { authenticatedRouter } from "../../middleware/auth";

const dashboardRouter = Router();

dashboardRouter
  .route("/user")
  .post(authenticatedRouter, createUser)

export default dashboardRouter;
