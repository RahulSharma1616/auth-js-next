"use client";
import { redirect } from "next/navigation";

export default function AdminPage() {
	return (
		<>
			<h3>Admin Page</h3>

			<h4>Welcome </h4>
			<h4>You have the admin page access</h4>

			<button type="button" onClick={() => redirect("/training")}>
				Training
			</button>
		</>
	);
}
