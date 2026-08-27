"use client";

import { useSession } from "next-auth/react";
import Snackbar from "./snackbar";
import { useSearchParams } from "next/navigation";

export function SnackbarHome() {
	const searchParams = useSearchParams();
	const { data: session } = useSession();
	const snackbarMessage = searchParams.get("message");

	if (session) return null;

	return (
		<>
			{snackbarMessage === "session_expired" && (
				<Snackbar message={"Please Sign In"} />
			)}
		</>
	);
}
