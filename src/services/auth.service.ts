import { compare, hash } from "bcrypt";

import { SignupFormDto } from "@/dtos/auth/register.dto";
import { IUser } from "@interfaces/models.interface";
import { HttpException } from "@/exceptions/HttpException";
import userModel from "@/models/User";
import { LoginFormDto } from "@/dtos/auth/login.dto";
import blacklistTokenModel from "@/models/BlacklistToken";

class AuthService {
  public async findUser(
    data: LoginFormDto
  ): Promise<{ user: IUser; token: string }> {
    const user = await userModel
      .findOne({ email: data.email })
      .select("+password")
      .exec();
    if (!user) {
      throw new HttpException(401, "User not found");
    }

    const isPasswordCorrect = await compare(data.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(401, "Invalid credentials provided");
    }

    const token = user.generateAuthToken();

    return {
      user: (({ password, ...rest }) => rest)(user.toObject()), // eslint-disable-line @typescript-eslint/no-unused-vars
      token,
    };
  }

  public async logout(token: string): Promise<void> {
    const isTokenBlacklisted = await blacklistTokenModel.exists({ token });

    if (isTokenBlacklisted) {
      return;
    }

    await blacklistTokenModel.create({ token });
  }

  public async createUser(data: SignupFormDto): Promise<IUser> {
    const user = await userModel.findOne({ email: data.email }).exec();
    if (user) {
      throw new HttpException(401, "This email already exists");
    }

    const hashedPassword = await hash(data.password, 10);

    const newUser = await userModel.create({
      ...data,
      password: hashedPassword,
    });
    return (({ password, ...rest }) => rest)(newUser.toObject()); // eslint-disable-line @typescript-eslint/no-unused-vars
  }
}

export default AuthService;
