import { useState } from "react";
import { useSEO } from "@/hooks/useSEO";

const DIVISIONS = [
  "8U (Ages 5–8)",
  "10U (Ages 9–10)",
  "12U (Ages 11–12)",
  "14U (Ages 13–14)",
  "Adult (Ages 18+)",
  "Co-Ed Adult (Ages 18+)",
];

const TEAM_PREFS = [
  "I have a full team (6+ players)",
  "I have a partial team (3–5 players)",
  "I'm registering as an individual / free agent",
  "I want to be a team captain",
];

type Status = "idle" | "loading" | "success" | "error";

export default function FlagLeague() {
  useSEO({
    title: "Register Now — Pinellas Park Flag Football League",
    description:
      "Sign up for the Pinellas Park Flag Football League starting April 24th. All ages welcome. Registration closes soon — secure your spot today!",
    path: "/flag-league",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    division: "",
    teamPreference: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/flag-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1f0a] text-white font-sans">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0d2b0d] px-5 pt-16 pb-12 text-center">
        {/* field lines decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-block rounded-full bg-[#f5a623] px-4 py-1 text-xs font-bold uppercase tracking-widest text-black mb-5">
            Season Starts April 24 · Pinellas Park, FL
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Pinellas Park<br />
            <span className="text-[#f5a623]">Flag Football League</span>
          </h1>
          <p className="text-white/70 text-lg mb-6 max-w-xl mx-auto">
            All ages welcome. Fast-paced, fun, community flag football — games played weekly starting April 24th. Spots are limited, so don't wait.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {["All Ages", "Teams & Free Agents", "Weekly Games", "Competitive & Rec"].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5 text-white/60">
                <span className="text-[#f5a623]">✓</span> {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <div className="bg-[#f5a623] text-black text-center text-sm font-bold py-2.5 px-4 tracking-wide">
        ⚡ Registration closing soon — secure your spot before it's full!
      </div>

      {/* Registration Form */}
      <section className="px-5 py-12">
        <div className="mx-auto max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-2">Register Now</h2>
          <p className="text-white/50 text-sm text-center mb-8">
            Fill out the form below and we'll reach out with next steps.
          </p>

          {status === "success" ? (
            <div className="rounded-2xl bg-[#0d2b0d] border border-[#f5a623]/40 p-10 text-center">
              <div className="text-5xl mb-4">🏈</div>
              <h3 className="text-2xl font-bold text-[#f5a623] mb-2">You're registered!</h3>
              <p className="text-white/70 text-sm">
                Thanks for signing up. We'll contact you soon with league details, schedules, and payment info.
                <br /><br />
                See you on the field on <strong className="text-white">April 24th!</strong>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 space-y-5"
              noValidate
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Jordan Smith"
                  className="w-full rounded-lg bg-white/10 border border-white/15 text-white text-base px-4 py-3 placeholder:text-white/30 focus:border-[#f5a623] focus:outline-none transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(727) 555-0100"
                  className="w-full rounded-lg bg-white/10 border border-white/15 text-white text-base px-4 py-3 placeholder:text-white/30 focus:border-[#f5a623] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-lg bg-white/10 border border-white/15 text-white text-base px-4 py-3 placeholder:text-white/30 focus:border-[#f5a623] focus:outline-none transition-colors"
                />
              </div>

              {/* Division */}
              <div>
                <label htmlFor="division" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Age Division *
                </label>
                <select
                  id="division"
                  name="division"
                  required
                  value={form.division}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0d2b0d] border border-white/15 text-white text-base px-4 py-3 focus:border-[#f5a623] focus:outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>Select your division…</option>
                  {DIVISIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Team Preference */}
              <div>
                <label htmlFor="teamPreference" className="block text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
                  Team Situation
                </label>
                <select
                  id="teamPreference"
                  name="teamPreference"
                  value={form.teamPreference}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-[#0d2b0d] border border-white/15 text-white text-base px-4 py-3 focus:border-[#f5a623] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select an option…</option>
                  {TEAM_PREFS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-[#f5a623] text-black font-bold text-base py-4 mt-2 hover:bg-[#ffc04a] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Submitting…" : "Register for the League →"}
              </button>

              <p className="text-white/30 text-xs text-center">
                We'll follow up via phone/email with payment and schedule details.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Details Section */}
      <section className="px-5 pb-16">
        <div className="mx-auto max-w-lg grid grid-cols-2 gap-4">
          {[
            { icon: "📍", label: "Location", value: "Pinellas Park, FL" },
            { icon: "📅", label: "Season Start", value: "April 24, 2026" },
            { icon: "🏈", label: "Format", value: "Flag Football" },
            { icon: "👥", label: "Ages", value: "All ages welcome" },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl bg-white/5 border border-white/10 p-4 text-center"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">{label}</div>
              <div className="text-sm font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
