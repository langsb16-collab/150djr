import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import { uploadYoutube } from "./src/lib/social/youtube";
import { uploadInstagram } from "./src/lib/social/instagram";
import { uploadFacebook } from "./src/lib/social/facebook";
import { uploadTwitter } from "./src/lib/social/twitter";
import { uploadTiktok } from "./src/lib/social/tiktok";
import { uploadNaverBlog } from "./src/lib/social/naver";
import { uploadTaobao, uploadTmall } from "./src/lib/china/taobao";
import { upload1688 } from "./src/lib/china/alibaba1688";
import { uploadPinduoduo } from "./src/lib/china/pinduoduo";
import { uploadJD } from "./src/lib/china/jd";
import { uploadXiaohongshu } from "./src/lib/china/xiaohongshu";
import { uploadBilibili } from "./src/lib/china/bilibili";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("adbrain.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT,
    product_url TEXT,
    product_description TEXT,
    script JSON,
    scenes JSON,
    status TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects ORDER BY created_at DESC").all();
    res.json(projects.map(p => ({
      ...p,
      script: JSON.parse(p.script as string),
      scenes: JSON.parse(p.scenes as string)
    })));
  });

  app.post("/api/projects", (req, res) => {
    const { id, name, product_url, product_description, script, scenes, status } = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO projects (id, name, product_url, product_description, script, scenes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, name, product_url, product_description, JSON.stringify(script), JSON.stringify(scenes), status);
    res.json({ success: true });
  });

  app.post("/api/social/upload", async (req, res) => {
    try {
      const { videoUrl, title, description, platforms } = req.body;
      
      const uploadTasks = [];
      
      if (platforms.includes('youtube')) uploadTasks.push(uploadYoutube(videoUrl, title, description));
      if (platforms.includes('instagram')) uploadTasks.push(uploadInstagram(videoUrl, title));
      if (platforms.includes('facebook')) uploadTasks.push(uploadFacebook(videoUrl, title));
      if (platforms.includes('twitter')) uploadTasks.push(uploadTwitter(videoUrl, title));
      if (platforms.includes('tiktok')) uploadTasks.push(uploadTiktok(videoUrl, title));
      if (platforms.includes('naver')) uploadTasks.push(uploadNaverBlog(videoUrl, title, description));
      
      // Chinese Platforms
      if (platforms.includes('taobao')) uploadTasks.push(uploadTaobao(videoUrl, title, description));
      if (platforms.includes('tmall')) uploadTasks.push(uploadTmall(videoUrl, title, description));
      if (platforms.includes('1688')) uploadTasks.push(upload1688(videoUrl, title));
      if (platforms.includes('pinduoduo')) uploadTasks.push(uploadPinduoduo(videoUrl, title));
      if (platforms.includes('jd')) uploadTasks.push(uploadJD(videoUrl, title));
      if (platforms.includes('xiaohongshu')) uploadTasks.push(uploadXiaohongshu(videoUrl, title, description));
      if (platforms.includes('bilibili')) uploadTasks.push(uploadBilibili(videoUrl, title, description));

      const results = await Promise.allSettled(uploadTasks);
      
      res.json({ 
        success: true, 
        results: results.map(r => r.status === 'fulfilled' ? r.value : { success: false, error: (r as any).reason.message }) 
      });
    } catch (error: any) {
      console.error("Social upload API error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/projects/:id", (req, res) => {
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(req.params.id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json({
      ...project,
      script: JSON.parse((project as any).script),
      scenes: JSON.parse((project as any).scenes)
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
