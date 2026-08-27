import db from "./db";

function createUser(email, password) {
	try {
		console.log("🏃 Executing database insert for:", email);

		const result = db
			.prepare("INSERT INTO users (email, password) VALUES (?, ?)")
			.run(email, password);

		console.log("===c Success Result:", result);
		return result.lastInsertRowid;
	} catch (dbError) {
		console.error("❌ SQLite Query Failed inside createUser:", dbError);
		throw dbError; // Bubble up to main authorize catch block
	}
}

function getUserByEmail(email) {
	try {
		console.log("🔍 Database lookup triggered for email:", email);

		// We break this into a separate line to ensure safe logging
		const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

		console.log("===e Found row:", row);
		return row;
	} catch (error) {
		console.error("❌ SQLite Query Failed inside getUserByEmail:", error);
		throw error; // Pass it up to the main handler
	}
}

export { createUser, getUserByEmail };
