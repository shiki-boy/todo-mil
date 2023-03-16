import { Router } from "express";

import AuthController from "@/controllers/auth.controller";
import { Routes } from "@interfaces/routes.interface";
import { SignupFormBody } from "@/dtos/auth/register.dto";
import { LoginFormBody } from "@/dtos/auth/login.dto";
import { validateRequest } from "@/middlewares/validateRequest.middleware";
import authenticate from "@/middlewares/authenticate";

class AuthRoute implements Routes {
  public path = "/api/auth";
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validateRequest({ body: LoginFormBody }),
      this.authController.login
    );

    this.router.post(
      `${this.path}/register`,
      validateRequest({ body: SignupFormBody }),
      this.authController.register
    );

    this.router.post(
      `${this.path}/logout`,
      authenticate,
      this.authController.logout
    );

    this.router.get(
      `${this.path}/user/info`,
      authenticate,
      this.authController.userInfo
    );
  }
}

export default AuthRoute;
