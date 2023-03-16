import { JwtPayload } from "jsonwebtoken";
import { Model, Schema } from "mongoose";

interface BaseFields {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

// ! ====== USER ======
export interface IUser extends BaseFields {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  isActive: boolean;
}

interface IUserMethods {
  generateAuthToken: () => string;
}

export interface User extends Model<IUser, object, IUserMethods> {
  findByToken: (token: string) => Promise<User>;
}
// ! ======

// ! ====== BLACKLIST TOKEN ======
export interface BlacklistToken extends BaseFields {
  token: string;
}
// ! ======

// ! ====== BLACKLIST TOKEN ======
export interface Todo extends BaseFields {
  title: string;
  isCompleted: boolean;
  user: Schema.Types.ObjectId;
}
// ! ======

export interface CustomTokenPayload extends JwtPayload {
  _id: string;
}
