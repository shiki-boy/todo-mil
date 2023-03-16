import { Response, NextFunction } from "express";

import userModel from "@/models/User";
import { RequestWithUser } from "@/interfaces/utils.interface";
import blacklistTokenModel from "@/models/BlacklistToken";

const authenticate = function (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split("Bearer").pop().trim();

  // check if token is blacklisted or not
  blacklistTokenModel.exists({ token }).then((result) => {
    if (result) {
      res.status(401).json({ message: "Your session has expired" });
    }
  });

  userModel
    .findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      } else {
        req.user = user;
        req.token = token;
        next();
      }
    })
    .catch((err) =>
      res
        .status(401)
        .json({ message: "No authentication credentials provided" })
    );
};

export default authenticate;
