import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Download } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function LeadMagnet() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setFormState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), role: role.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }

      setFormState("success");
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Could not submit. Please try again.");
    }
  }

  return (
    <section id="free-resource" className="w-full bg-[#0a0a0a] py-16 md:py-24 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-3xl mx-auto">

        {/* Label */}
        <motion.p
          className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Free Resource
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-white text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Get the QB Film Breakdown Checklist
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          className="text-center text-white/45 text-sm font-sans leading-relaxed mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          The same pre-session framework our coaches use on every film session — pre-snap reads,
          mechanics keys, decision-making markers, and a debrief protocol. Print it. Use it tomorrow.
        </motion.p>

        <AnimatePresence mode="wait">
          {formState === "success" ? (
            /* Thank-you state */
            <motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={48} className="text-gold mx-auto mb-5" />
              <p className="font-serif text-2xl text-white mb-3">You're in.</p>
              <p className="text-white/50 text-sm font-sans mb-8 max-w-sm mx-auto">
                Your checklist is ready to download. Print it out before your next film session.
              </p>
              <a
                href="/qb-film-checklist.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 hover:bg-yellow-300 transition-colors"
              >
                <Download size={14} />
                Download Checklist
              </a>
            </motion.div>
          ) : (
            /* Capture form */
            <motion.form
              key="form"
              className="space-y-4"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lm-name" className="sr-only">Name</label>
                  <input
                    id="lm-name"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lm-email" className="sr-only">Email Address</label>
                  <input
                    id="lm-email"
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lm-role" className="sr-only">Your Role</label>
                <select
                  id="lm-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-black border border-white/15 text-sm px-4 py-3 font-sans focus:border-gold focus:outline-none transition-colors text-white/60"
                >
                  <option value="" disabled>Your Role (optional)</option>
                  <option value="head_coach">Head Coach</option>
                  <option value="oc_qb_coach">Offensive Coordinator / QB Coach</option>
                  <option value="athlete_parent">Athlete or Parent</option>
                  <option value="athletic_director">Athletic Director</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {formState === "error" && (
                <p className="text-red-400 text-xs font-sans">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full flex items-center justify-center gap-3 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-6 py-4 hover:bg-yellow-300 transition-colors group disabled:opacity-60"
              >
                {formState === "submitting" ? "Sending…" : "Send Me the Checklist"}
                {formState !== "submitting" && (
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                )}
              </button>

              <p className="text-center text-white/20 text-xs font-sans">
                No spam. Unsubscribe any time.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
