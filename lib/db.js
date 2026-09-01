import "server-only";

import sql from "better-sqlite3";
import { hashUserPassword } from "./hash";

const db = sql("my-auth.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS trainings (
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    description TEXT
  );
`);

const adminEmail = "master.admin@email.com";
const checkUser = db.prepare("SELECT id FROM users WHERE email = ?");
const existingAdmin = checkUser.get(adminEmail);

if (!existingAdmin) {
	const insertUser = db.prepare(`
    INSERT INTO users (email, password, role)
    VALUES ( ?,?,?)  
  `);

	insertUser.run(adminEmail, hashUserPassword("passwordadmin"), "admin");

	console.log(
		"✅ SQLite Database initialized: Default Master Admin provisioned",
	);
}

const hasTrainings =
	db.prepare("SELECT COUNT(*) as count FROM trainings").get().count > 0;

if (!hasTrainings) {
	db.exec(`
    INSERT INTO trainings (title, image, description)
    VALUES
    ('Yoga', '/yoga.jpg', 'A gentle way to improve flexibility and balance.'),
    ('Boxing', '/boxing.jpg', 'A high-energy workout that improves strength and speed.'),
    ('Running', '/running.jpg', 'A great way to improve cardiovascular health and endurance.'),
    ('Weightlifting', '/weightlifting.jpg', 'A strength-building workout that helps tone muscles.'),
    ('Cycling', '/cycling.jpg', 'A low-impact workout that improves cardiovascular health and endurance.'),
    ('Gaming', '/gaming.jpg', 'A fun way to improve hand-eye coordination and reflexes.'),
    ('Sailing', '/sailing.jpg', 'A relaxing way to enjoy the outdoors and improve balance.');
`);
}

export default db;
