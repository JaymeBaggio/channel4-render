import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- health check ---
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "channel4-render",
    env: process.env.NODE_ENV || "production",
  });
});

// --- hello root ---
app.get("/", (req, res) => {
  res.send("✅ Channel 4 branding backend is running!");
});

// --- render stub (we'll implement FFmpeg later) ---
app.post("/render", async (req, res) => {
  try {
    const {
      videoPath,       // e.g. a Supabase path or public URL to your uploaded clip
      platform,        // e.g. "tiktok" | "reels" | "shorts"
      brandLogoUrl,    // partner logo URL
      endCardColor,    // e.g. "#3F2E91"
      options = {}     // any other flags (captions, safe-zones, etc)
    } = req.body || {};

    if (!videoPath || !platform) {
      return res.status(400).json({
        error: "Missing required fields: videoPath and platform",
      });
    }

    // For now: just echo what we received
    // Next step we'll trigger actual processing.
    return res.status(200).json({
      ok: true,
      received: { videoPath, platform, brandLogoUrl, endCardColor, options },
      message: "Render request accepted (stub). Processing will be added next.",
    });
  } catch (err) {
    console.error("Render error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
