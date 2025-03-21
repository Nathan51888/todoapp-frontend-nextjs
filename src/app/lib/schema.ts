import { z } from "zod";

export const userSchema = z.object({
    email: z.string().trim().email({
        message: "Invalid email. Please enter a valid email address",
    }),
    password: z.string().trim().min(3).max(30),
    firstName: z.string().trim().min(1).max(50),
    lastName: z.string().trim().min(1).max(50),
    birthday: z.string().trim().min(1).max(50),
})
export type UserSchema = z.infer<typeof userSchema>

export const loginSchema = userSchema.pick({
    email: true,
    password: true,
})
export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = userSchema.pick({
    email: true,
    password: true,
})

