import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata = {
	title: "Next Auth",
	description: "Next.js Authentication",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="hydrated">
			<body>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
