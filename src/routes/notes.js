import express from "express";
import { getDB } from "../models/db.js";

const router = express.Router();

// Add note
router.post("/add", (req, res) => {
  const db = getDB();
  const { text } = req.body;
  db.run("INSERT INTO notes (text) VALUES (?)", [text], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, text });
  });
});

// Get all notes
router.get("/", (req, res) => {
  const db = getDB();
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Delete note
router.delete("/:id", (req, res) => {
  const db = getDB();
  db.run("DELETE FROM notes WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

export default router;
