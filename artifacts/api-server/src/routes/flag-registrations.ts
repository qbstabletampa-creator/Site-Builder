import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

const FILE = path.resolve(process.cwd(), "flag-registrations.csv");
const HEADER = "timestamp,name,email,phone,division,teamPreference\n";

function ensureHeader() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, HEADER, "utf8");
  }
}

interface FlagRegData {
  name: string;
  email: string;
  phone: string;
  division: string;
  teamPreference: string;
}

function appendReg(data: FlagRegData) {
  ensureHeader();
  const ts = new Date().toISOString();
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const row =
    [esc(ts), esc(data.name), esc(data.email), esc(data.phone), esc(data.division), esc(data.teamPreference)].join(",") + "\n";
  fs.appendFileSync(FILE, row, "utf8");
}

router.post("/flag-registrations", (req, res) => {
  const { name, email, phone, division, teamPreference } = req.body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required." });
    return;
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }
  if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
    res.status(400).json({ error: "Phone number is required." });
    return;
  }
  if (!division || typeof division !== "string") {
    res.status(400).json({ error: "Division/age group is required." });
    return;
  }

  const data: FlagRegData = {
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 320),
    phone: phone.trim().slice(0, 50),
    division: division.trim().slice(0, 100),
    teamPreference: (typeof teamPreference === "string" ? teamPreference.trim() : "").slice(0, 200),
  };

  try {
    appendReg(data);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to save flag registration:", err);
    res.status(500).json({ error: "Could not save registration. Please try again." });
  }
});

export default router;
