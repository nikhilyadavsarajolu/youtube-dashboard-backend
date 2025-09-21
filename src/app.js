import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import notesRoutes from "./routes/notes.js";
import { initDB } from "./models/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

(async () => {
  try {
    await initDB();
    console.log("Database initialized ✅");

    // Routes
    app.use("/video", videoRoutes);
    app.use("/comment", commentRoutes);
    app.use("/notes", notesRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to initialize DB:", err);
  }
})();
