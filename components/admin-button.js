"use client";

import { redirect } from "next/navigation";

export default function AdminButton() {
	return (
		<button type="button" onClick={() => redirect("/admin")}>
			Admin
		</button>
	);
}
