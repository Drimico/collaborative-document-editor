import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address").max(30),
  password: z.string().min(8, "Password must be at least 8 characters").max(12),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(3, "Name must be at least 3 characters").max(15),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;