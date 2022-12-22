import { Router } from "express";
import { getUsers, userLogIn, userSignUp } from "../../controller";
import { authenticatedRouter } from "../../middleware/auth";
import { signUpValidation } from "../../validators";

const dashboardRouter = Router();

dashboardRouter
  .route("/user")
  .get(authenticatedRouter, getUsers)

  dashboardRouter
    .route('/user/signup')
    .post(signUpValidation, userSignUp);

  dashboardRouter
    .route("/user/login")
    .post(userLogIn)

export default dashboardRouter;
