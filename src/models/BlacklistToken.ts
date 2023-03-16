import { BlacklistToken } from "@/interfaces/models.interface";
import { model, Schema } from "mongoose";

// on logout we save the token here
const blacklistTokenSchema: Schema = new Schema<BlacklistToken>(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blacklistTokenModel = model<BlacklistToken & Document>(
  "BlacklistToken",
  blacklistTokenSchema
);

export default blacklistTokenModel;
