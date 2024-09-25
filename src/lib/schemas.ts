import { z } from "zod";

export const linkSchema = z.object({
  link: z.string().min(1).url(),
});

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export const signupSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8, "Must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Must be at least 8 characters"),
});
