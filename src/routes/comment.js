import express from "express";
import { youtube } from "../config.js";
import { getDB } from "../models/db.js";

const router = express.Router();

// Add a top-level comment
router.post("/add", async (req, res) => {
  const { videoId, text } = req.body;
  try {
    const response = await youtube.commentThreads.insert({
      part: "snippet",
      requestBody: {
        snippet: { videoId, topLevelComment: { snippet: { textOriginal: text } } },
      },
    });

    const db = getDB();
    db.run("INSERT INTO logs (action) VALUES (?)", [`Added comment on ${videoId}`]);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reply to a comment
router.post("/reply", async (req, res) => {
  const { parentId, text } = req.body;
  try {
    const response = await youtube.comments.insert({
      part: "snippet",
      requestBody: { snippet: { parentId, textOriginal: text } },
    });

    const db = getDB();
    db.run("INSERT INTO logs (action) VALUES (?)", [`Replied to comment ${parentId}`]);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    await youtube.comments.delete({ id: req.params.id });
    const db = getDB();
    db.run("INSERT INTO logs (action) VALUES (?)", [`Deleted comment ${req.params.id}`]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
