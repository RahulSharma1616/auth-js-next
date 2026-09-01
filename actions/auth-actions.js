"use server";
import "server-only";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { createUser } from "@/lib/auth-db";
import { hashUserPassword } from "@/lib/hash";
import { signInSchema } from "@/lib/zod";

export async function loginServerAction(mode, prevState, formData) {
	const email = formData.get("email");
	const password = formData.get("password");
	const values = {
		email,
		password,
	};

	const parsed = await signInSchema.safeParseAsync(values);

	if (!parsed.success) {
		return {
			errors: parsed.error.issues.map((issue) => ({
				type: "validation",
				field: issue.path[0],
				message: issue.message,
			})),
		};
	}

	//if signing up then createUser
	if (mode === "signup") {
		try {
			createUser(email, hashUserPassword(password));
		} catch (err) {
			if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
				return {
					errors: [
						{
							type: "validation",
							field: "email",
							message:
								"It seems like an account for the chosen email already exists",
						},
					],
				};
			}
			throw err;
		}
	}

	// valid user -> sign in
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: "/training",
		});

		return {
			success: true,
			errors: [],
		};
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return {
						errors: [
							{
								type: "auth",
								field: "root",
								message: "Invalid email or password",
							},
						],
					};
				default:
					return {
						error: [
							{
								type: "auth",
								field: "root",
								message: "Something went wrong. Please try again",
							},
						],
					};
			}
		}
		throw error;
	}
}
