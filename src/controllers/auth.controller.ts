import { NextFunction, Request, Response } from "express";

import { RequestWithUser } from "@/interfaces/utils.interface";
import { SignupFormDto } from "@/dtos/auth/register.dto";
import { LoginFormDto } from "@/dtos/auth/login.dto";
import AuthService from "@/services/auth.service";

class AuthController {
  public authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // check username, password
      const data: LoginFormDto = req.body;
      const responseData = await this.authService.findUser(data);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      await this.authService.logout(req.token);

      res.json({message: "User successfully logged out"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: SignupFormDto = req.body;
      const responseData = await this.authService.createUser(data);

      res.json(responseData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public userInfo = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default AuthController;
