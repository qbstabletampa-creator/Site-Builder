import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Serve static SPA in production
/* eslint-disable-next-line no-underscore-dangle */
declare const __dirname: string;
const staticDir = process.env["STATIC_DIR"] ??
  path.resolve(__dirname, "../../web/dist/public");

if (fs.existsSync(staticDir)) {
  app.use(express.static(staticDir));
  // SPA fallback — let the client-side router handle unknown routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;
