import AuthForm from "@/components/auth-form";
import { SnackbarHome } from "@/components/snackbar-home";

export default async function Home({ searchParams }) {
	const formMode = (await searchParams).mode || "login";

	return (
		<>
			<SnackbarHome />
			<AuthForm mode={formMode} />
		</>
	);
}
