import sqlite3 from "sqlite3";

let db;

export function initDB() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database("./youtube_dashboard.db", (err) => {
      if (err) return reject(err);

      db.run(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT)",
        (err) => { if (err) return reject(err); }
      );
      db.run(
        "CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
        (err) => { if (err) return reject(err); }
      );

      resolve();
    });
  });
}

export function getDB() {
  if (!db) throw new Error("DB not initialized. Call initDB() first.");
  return db;
}
