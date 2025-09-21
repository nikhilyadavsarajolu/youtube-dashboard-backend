import express from "express";
import { youtube } from "../config.js";
import { getDB } from "../models/db.js";

const router = express.Router();

// Fetch video details
router.get("/:id", async (req, res) => {
  try {
    const videoId = req.params.id;
    const response = await youtube.videos.list({
      part: "snippet,statistics",
      id: videoId,
    });

    if (!response.data.items.length)
      return res.status(404).json({ error: "Video not found" });

    const video = response.data.items[0];

    // Log action
    const db = getDB();
    db.run("INSERT INTO logs (action) VALUES (?)", [`Fetched video ${videoId}`]);

    res.json({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.default.url,
      views: video.statistics.viewCount,
      likes: video.statistics.likeCount,
      comments: video.statistics.commentCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update video title & description
router.put("/update/:id", async (req, res) => {
  const videoId = req.params.id;
  const { title, description } = req.body;

  try {
    const response = await youtube.videos.update({
      part: "snippet",
      requestBody: {
        id: videoId,
        snippet: {
          title,
          description,
          categoryId: "22"
        },
      },
    });

    const db = getDB();
    db.run("INSERT INTO logs (action) VALUES (?)", [`Updated video ${videoId}`]);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
