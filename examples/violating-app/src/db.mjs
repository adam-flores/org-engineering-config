// !! DELIBERATE VIOLATION (arch-no-local-sql-databases, Strategic · ci-gate → BLOCK) !!
// A local/embedded SQL database (SQLite) instead of an approved managed datastore.
import Database from "better-sqlite3";

export const db = new Database("data.db");
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT)");
