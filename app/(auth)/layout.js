import { auth, signOut } from "@/auth";
import AdminButton from "@/components/admin-button";
import "../globals.css";

export const metadata = {
	title: "Next Auth",
	description: "Next.js Authentication",
};

export default async function AuthRootLayout({ children }) {
	const session = await auth();

	const showAdmin = session?.user?.role === "admin";

	return (
		<>
			<header className="auth-header">
				<p>Welcome back!</p>

				{showAdmin && <AdminButton />}
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
