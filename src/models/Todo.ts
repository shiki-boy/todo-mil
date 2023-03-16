import { model, Schema, Document } from "mongoose";
import { Todo } from "@interfaces/models.interface";
import userModel from "./User";

const ObjectId = Schema.Types.ObjectId;

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
      type: ObjectId,
      ref: userModel,
      required: true,
      // validate: {
      //   validator: (userId: string) => {
      //     return false;
      //   },
      //   message: "No such user",
      // },
    },
  },
  { timestamps: true }
);

const todoModel = model<Todo & Document>("Todo", todoSchema);

export default todoModel;
