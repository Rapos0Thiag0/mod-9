import { Router } from "express";
import { SignUpUserController } from "../controllers/sign-Up.controller";
import { SignInUserController } from "../controllers/sign-In.controller";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();

    routes.post(
      "/signup",
      new SignUpUserController().handle
    ); /* chamada no front no arquivo novaConta */
    routes.post(
      "/signin",
      new SignInUserController().handle
    ); /* chamada no front no arquivo login */

    return routes;
  }
}
