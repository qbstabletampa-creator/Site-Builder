import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const leadsDir = process.env["LEADS_DIR"] ?? process.cwd();
const LEADS_FILE = path.resolve(leadsDir, "leads.csv");

const CSV_HEADER = "timestamp,name,email,phone,organization,role,level,goals,message\n";

function ensureHeader() {
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, CSV_HEADER, "utf8");
  }
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  level: string;
  goals: string;
  message: string;
}

function appendLead(data: LeadData) {
  ensureHeader();
  const timestamp = new Date().toISOString();
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const row = [
    escape(timestamp),
    escape(data.name),
    escape(data.email),
    escape(data.phone),
    escape(data.organization),
    escape(data.role),
    escape(data.level),
    escape(data.goals),
    escape(data.message),
  ].join(",") + "\n";
  fs.appendFileSync(LEADS_FILE, row, "utf8");
}

router.post("/leads", (req, res) => {
  const {
    name,
    email,
    phone,
    organization,
    role,
    level,
    goals,
    message,
  } = req.body as Record<string, unknown>;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const data: LeadData = {
    name: (typeof name === "string" ? name : "").slice(0, 200),
    email: email.slice(0, 320),
    phone: (typeof phone === "string" ? phone : "").slice(0, 50),
    organization: (typeof organization === "string" ? organization : "").slice(0, 200),
    role: (typeof role === "string" ? role : "").slice(0, 100),
    level: (typeof level === "string" ? level : "").slice(0, 100),
    goals: (Array.isArray(goals) ? goals.join(";") : typeof goals === "string" ? goals : "").slice(0, 500),
    message: (typeof message === "string" ? message : "").slice(0, 1000),
  };

  try {
    appendLead(data);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to save lead:", err);
    res.status(500).json({ error: "Could not save. Please try again." });
  }
});

export default router;
