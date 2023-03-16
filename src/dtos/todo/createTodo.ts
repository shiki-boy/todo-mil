import { z } from "zod";

export const UpsertTodoObject = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
  // user: z.instanceof(Schema.Types.ObjectId),
});

export type UpsertTodoDto = z.infer<typeof UpsertTodoObject>;
