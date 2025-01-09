import { z } from "zod";

const signupSchema = z.object({
	body: z.object({
		username: z.string().min(3, "Username must be provided"),
		email: z.string().email("Email is invalid"),
		password: z.string().min(8, "Password must be minimum of 8 characters"),
		about: z.string().optional(),
	}),
});

const loginSchema = z.object({
	body: z.object({
		email: z.string().email("Email is invalid"),
		password: z.string().min(8, "Password must be minimum of 8 characters"),
	}),
});

export { signupSchema, loginSchema };
