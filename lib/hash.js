import crypto from "node:crypto";

export function hashUserPassword(password) {
	const salt = crypto.randomBytes(16).toString("hex");

	const hashedPassword = crypto.scryptSync(password, salt, 64);
	return `${hashedPassword.toString("hex")}:${salt}`;
}

export function verifyPassword(storedPassword, suppliedPassword) {
	try {
		console.log("🔑 verifyPassword triggered!");

		// 1. Safety check to make sure values exist
		if (!storedPassword || !suppliedPassword) {
			console.error("❌ Missing storedPassword or suppliedPassword parameter.");
			return false;
		}

		// 2. Extract hash and salt safely
		const [hashedPassword, salt] = storedPassword.split(":");
		if (!hashedPassword || !salt) {
			console.error("❌ Stored password format invalid. Expected 'hash:salt'.");
			return false;
		}

		const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");

		// 3. FIX: Use scryptSync instead of scrypt, matching keylength 64 [1]
		const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);

		// 4. Safety length validation to prevent timingSafeEqual crash
		if (hashedPasswordBuf.length !== suppliedPasswordBuf.length) {
			console.error(
				"❌ Buffer length mismatch! Hashed and supplied keys do not match.",
			);
			return false;
		}

		// 5. Secure timing comparison
		const isValid = crypto.timingSafeEqual(
			hashedPasswordBuf,
			suppliedPasswordBuf,
		);
		console.log("=== Password evaluation result:", isValid);

		return isValid;
	} catch (error) {
		console.error("❌ Error encountered inside verifyPassword handler:", error);
		return false;
	}
}
