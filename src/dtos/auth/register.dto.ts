import { z } from "zod";

export const SignupFormBody = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  firstName: z.string(),
  lastName: z.string(),
});

export type SignupFormDto = z.infer<typeof SignupFormBody>;
