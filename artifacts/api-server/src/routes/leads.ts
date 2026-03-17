import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const LEADS_FILE = path.resolve(process.cwd(), "leads.csv");

function ensureHeader() {
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, "timestamp,name,email,role\n", "utf8");
  }
}

function appendLead(name: string, email: string, role: string) {
  ensureHeader();
  const timestamp = new Date().toISOString();
  // Escape fields to handle commas/quotes in values
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const row = [escape(timestamp), escape(name), escape(email), escape(role)].join(",") + "\n";
  fs.appendFileSync(LEADS_FILE, row, "utf8");
}

router.post("/leads", (req, res) => {
  const { name, email, role } = req.body as { name?: string; email?: string; role?: string };

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const safeName = (name ?? "").slice(0, 200);
  const safeEmail = email.slice(0, 320);
  const safeRole = (role ?? "").slice(0, 100);

  try {
    appendLead(safeName, safeEmail, safeRole);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to save lead:", err);
    res.status(500).json({ error: "Could not save. Please try again." });
  }
});

export default router;
