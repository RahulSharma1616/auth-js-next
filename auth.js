import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

import { getUserByEmail } from "./lib/auth-db";
import { verifyPassword } from "./lib/hash";
import { signInSchema } from "./lib/zod";

const providers = [
	Credentials({
		name: "credentials",
		credentials: {
			email: {
				type: "email",
				label: "Email",
				placeholder: "johndoe@gmail.com",
			},
			password: {
				type: "password",
				label: "Password",
				placeholder: "*****",
			},
		},

		authorize: async (credentials) => {
			try {
				let user = null;
				const parsed = await signInSchema.safeParseAsync(credentials);
				if (!parsed.success) {
					return null;
				}

				const { email, password } = parsed.data;

				// verify if the user exists
				user = getUserByEmail(email);

				if (!user) {
					// No user found, so this is their first attempt to login
					// Optionally, this is also the place you could do a user registration

					// launch snackbar
					throw new CredentialsSignin("User not found or invalid credentials");
				}

				//  verify password
				const valid = verifyPassword(user.password, password);

				if (!valid) {
					throw new CredentialsSignin("Invalid credentials");
				}

				// return user object with their profile data
				return user;
			} catch (error) {
				if (error instanceof ZodError) {
					// Return `null` to indicate that the credentials are invalid
					return null;
				}
			}
		},
	}),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: "jwt",
	},

	providers: providers,

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
			}

			return session;
		},
	},

	logger: {
		error(code, ...message) {
			console.error(code, message);
		},
		warn(code, ...message) {
			console.warn(code, message);
		},
		debug(code, ...message) {
			console.debug(code, message);
		},
	},

	secret: process.env.AUTH_SECRET,
});

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === "function") {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter((provider) => provider.id !== "credentials");
