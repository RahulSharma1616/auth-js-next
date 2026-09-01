import AuthForm from "@/components/auth-form";
import Snackbar from "@/components/snackbar";

export default async function Home({ searchParams }) {
	const resolvedSearchParams = await searchParams;
	const formMode = resolvedSearchParams.mode || "login";
	const message = resolvedSearchParams.message || "";

	return (
		<>
			{message === "access-denied" && <Snackbar message={"Not Authorized"} />}
			{formMode === "session_expired" && (
				<Snackbar message={"Please Sign In"} />
			)}
			<AuthForm mode={formMode} />
		</>
	);
}
