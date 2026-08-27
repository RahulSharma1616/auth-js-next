"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useId } from "react";
import { loginServerAction } from "@/actions/auth-actions";

export default function AuthForm({ mode }) {
	const id = useId();
	const [formState, formAction, isPending] = useActionState(
		loginServerAction.bind(null, mode),
		{},
	);

	return (
		<form id={`${id}-auth-form`} className="auth-form" action={formAction}>
			<div>
				<Image
					src="/images/auth-icon.jpg"
					alt="A lock icon"
					width={100}
					height={100}
					loading="eager"
				/>
			</div>
			<p>
				<label htmlFor={`${id}-email`} className="email">
					Email
				</label>
				<input id={`${id}-email`} className="email" name="email" type="email" />
			</p>
			<p>
				<label htmlFor={`${id}-password`} className="password">
					Password
				</label>
				<input
					id={`${id}-password`}
					className="password"
					name="password"
					type="password"
				/>
			</p>

			<ul className="form-errors">
				{formState.errors?.map((err, ind) => (
					<li key={ind}>{err.message}</li>
				))}
			</ul>

			<p>
				<button type="submit">
					{mode === "login" ? "Login" : "Create Account"}
				</button>
			</p>
			<p>
				{mode === "login" && <Link href="/?mode=signup">Create account.</Link>}
				{mode === "signup" && (
					<Link href="/?mode=login">Login with existing account.</Link>
				)}{" "}
			</p>
		</form>
	);
}
