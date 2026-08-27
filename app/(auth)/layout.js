import { signOut } from "@/auth";
import "../globals.css";

export const metadata = {
	title: "Next Auth",
	description: "Next.js Authentication",
};

export default function AuthRootLayout({ children }) {
	return (
		<>
			<header className="auth-header">
				<p>Welcome back!</p>
				<form
					action={async () => {
						"use server";

						await signOut({ redirectTo: "/?mode=login" });
					}}
				>
					<button type="submit">Logout</button>
				</form>
			</header>
			{children}
		</>
	);
}
