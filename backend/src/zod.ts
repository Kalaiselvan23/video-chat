import { z } from "zod";
export const UserSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  profilePictureUrl: z.string().url().optional(),
  lastLogin: z.date().optional(),
  status: z.enum(["online", "offline", "busy"]).optional(),
});

export const LoginUserSchema=z.object({
  username:z.string().optional(),
  password:z.string().min(8).max(20),
})

//ts exports
export type UserType=z.infer<typeof UserSchema>
export type loginUserType=z.infer<typeof LoginUserSchema>