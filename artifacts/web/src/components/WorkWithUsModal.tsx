import { useState, useCallback } from "react";
import { trackFormSubmission } from "@/lib/analytics";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ArrowLeft, ChevronRight } from "lucide-react";

type Role = "athlete" | "coach";
type Step = "role" | "goals" | "details" | "confirmation";

const athleteGoals = [
  { id: "mechanics", label: "Arm Mechanics & Biomechanics" },
  { id: "film", label: "Film Study & Football IQ" },
  { id: "recruiting", label: "College Recruiting & Exposure" },
  { id: "combine", label: "Combine / Pro Day Preparation" },
  { id: "consistency", label: "In-Game Performance & Consistency" },
  { id: "mental", label: "Mental Performance & Leadership" },
];

const coachGoals = [
  { id: "curriculum", label: "QB Curriculum Development" },
  { id: "evaluation", label: "Talent Evaluation Framework" },
  { id: "scheme", label: "Scheme Design & Play Calling" },
  { id: "program", label: "Program Building & Culture" },
  { id: "development", label: "Player Development Systems" },
  { id: "analytics", label: "Film & Analytics Integration" },
];

const stepVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

async function submitApplication(data: {
  role: Role;
  goals: string[];
  name: string;
  email: string;
  phone: string;
  organization: string;
  level: string;
  message: string;
}) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      role: data.role,
      level: data.level,
      goals: data.goals,
      message: data.message,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: string };
    throw new Error(body.error ?? "Submission failed. Please try again.");
  }
  return { success: true };
}

interface WorkWithUsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WorkWithUsModal({ open, onOpenChange }: WorkWithUsModalProps) {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    level: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const resetForm = useCallback(() => {
    setStep("role");
    setRole(null);
    setSelectedGoals([]);
    setFormData({ name: "", email: "", phone: "", organization: "", level: "", message: "" });
    setErrors({});
  }, []);

  const handleClose = useCallback(() => {
    onOpenChange(false);
    setTimeout(resetForm, 300);
  }, [onOpenChange, resetForm]);

  const handleRoleSelect = useCallback((r: Role) => {
    setRole(r);
    setSelectedGoals([]);
    setStep("goals");
  }, []);

  const toggleGoal = useCallback((goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!role) return;

      const newErrors: Record<string, boolean> = {};
      if (!formData.name.trim()) newErrors.name = true;
      if (!formData.email.trim() && !formData.phone.trim()) newErrors.contact = true;
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      setSubmitting(true);
      try {
        await submitApplication({ role, goals: selectedGoals, ...formData });
        trackFormSubmission({ role, goals: selectedGoals });
        setStep("confirmation");
      } finally {
        setSubmitting(false);
      }
    },
    [role, selectedGoals, formData]
  );

  const goals = role === "athlete" ? athleteGoals : coachGoals;
  const stepNumber = step === "role" ? 1 : step === "goals" ? 2 : step === "details" ? 3 : 4;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] bg-[#0a0a0a] border border-white/[0.08] shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200 overflow-hidden"
        >
          <DialogTitle className="sr-only">Work With Us Application</DialogTitle>

          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 rounded-sm p-1 text-white/30 hover:text-white/60 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {step !== "confirmation" && (
            <div className="px-6 sm:px-10 pt-6 sm:pt-8">
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-[2px] flex-1 transition-colors duration-300 ${
                      s <= stepNumber ? "bg-gold" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p className="text-white/25 text-[10px] font-sans uppercase tracking-[0.15em]">
                Step {stepNumber} of 3
              </p>
            </div>
          )}

          <div className="p-6 sm:p-10 pt-4 sm:pt-6 overflow-y-auto max-h-[80vh]">
            <AnimatePresence mode="wait">
              {step === "role" && (
                <motion.div
                  key="role"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-sans font-semibold mb-2">
                    Application
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] text-white mb-2">
                    I am a...
                  </h2>
                  <p className="text-white/40 text-sm font-sans mb-8">
                    Select your role to personalize your application.
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleRoleSelect("athlete")}
                      className="group w-full border border-white/10 text-left px-5 py-5 hover:border-gold/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-serif text-lg mb-1">Quarterback / Athlete</p>
                          <p className="text-white/35 text-xs font-sans">Looking to train, develop, or get recruited</p>
                        </div>
                        <ChevronRight size={16} className="text-white/20 group-hover:text-gold transition-colors" />
                      </div>
                    </button>
                    <button
                      onClick={() => handleRoleSelect("coach")}
                      className="group w-full border border-white/10 text-left px-5 py-5 hover:border-gold/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-serif text-lg mb-1">Coach / Organization</p>
                          <p className="text-white/35 text-xs font-sans">Looking for consulting, curriculum, or program support</p>
                        </div>
                        <ChevronRight size={16} className="text-white/20 group-hover:text-gold transition-colors" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "goals" && (
                <motion.div
                  key="goals"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-sans font-semibold mb-2">
                    {role === "athlete" ? "Athlete" : "Coach"} Application
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] text-white mb-2">
                    What are your goals?
                  </h2>
                  <p className="text-white/40 text-sm font-sans mb-6">
                    Select all that apply.
                  </p>

                  <div className="flex flex-col gap-2 mb-8">
                    {goals.map((goal) => {
                      const selected = selectedGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          onClick={() => toggleGoal(goal.id)}
                          className={`w-full text-left px-4 py-3 border text-sm font-sans transition-all duration-200 ${
                            selected
                              ? "border-gold/60 bg-gold/[0.06] text-white"
                              : "border-white/8 text-white/60 hover:border-white/20 hover:text-white/80"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
                                selected ? "border-gold bg-gold" : "border-white/20"
                              }`}
                            >
                              {selected && (
                                <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            {goal.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { setStep("role"); setSelectedGoals([]); }}
                      className="flex items-center gap-1.5 text-white/30 text-xs font-sans hover:text-white/50 transition-colors"
                    >
                      <ArrowLeft size={12} />
                      Back
                    </button>
                    <button
                      onClick={() => setStep("details")}
                      disabled={selectedGoals.length === 0}
                      className="flex-1 bg-gold text-black text-xs uppercase tracking-[0.15em] font-sans font-semibold px-6 py-3.5 hover:bg-gold-light transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div
                  key="details"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-sans font-semibold mb-2">
                    Almost There
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] text-white mb-2">
                    Your Details
                  </h2>
                  <p className="text-white/40 text-sm font-sans mb-6">
                    Tell us how to reach you.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, name: e.target.value }));
                          if (errors.name) setErrors((er) => ({ ...er, name: false }));
                        }}
                        className={`w-full bg-transparent border text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors ${
                          errors.name ? "border-red-400/60" : "border-white/12"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400/80 font-sans mt-1">Name is required.</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, email: e.target.value }));
                          if (errors.contact) setErrors((er) => ({ ...er, contact: false }));
                        }}
                        className={`w-full bg-transparent border text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors ${
                          errors.contact ? "border-red-400/60" : "border-white/12"
                        }`}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, phone: e.target.value }));
                          if (errors.contact) setErrors((er) => ({ ...er, contact: false }));
                        }}
                        className={`w-full bg-transparent border text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors ${
                          errors.contact ? "border-red-400/60" : "border-white/12"
                        }`}
                      />
                    </div>
                    {errors.contact && (
                      <p className="text-[11px] text-red-400/80 font-sans -mt-2">Please provide an email or phone number.</p>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder={role === "athlete" ? "School / Program" : "Organization"}
                        value={formData.organization}
                        onChange={(e) => setFormData((d) => ({ ...d, organization: e.target.value }))}
                        className="w-full bg-transparent border border-white/12 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                      />
                      <input
                        type="text"
                        placeholder={role === "athlete" ? "Level (HS / College / Pro)" : "Level (HS / College / Pro)"}
                        value={formData.level}
                        onChange={(e) => setFormData((d) => ({ ...d, level: e.target.value }))}
                        className="w-full bg-transparent border border-white/12 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>

                    <textarea
                      rows={3}
                      placeholder={role === "athlete" ? "Anything else we should know about your development..." : "Tell us about your program and what you're looking for..."}
                      value={formData.message}
                      onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                      className="w-full bg-transparent border border-white/12 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors resize-none"
                    />

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() => setStep("goals")}
                        className="flex items-center gap-1.5 text-white/30 text-xs font-sans hover:text-white/50 transition-colors"
                      >
                        <ArrowLeft size={12} />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-gold text-black text-xs uppercase tracking-[0.15em] font-sans font-semibold px-6 py-3.5 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                  className="text-center py-6"
                >
                  <div className="w-14 h-14 mx-auto mb-6 border border-gold/40 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-sans font-semibold mb-3">
                    Application Received
                  </p>
                  <h2 className="font-serif text-2xl text-white mb-3">
                    We'll Be In Touch.
                  </h2>
                  <p className="text-white/40 text-sm font-sans leading-relaxed mb-8 max-w-xs mx-auto">
                    Our team will review your application and reach out within 48 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-xs uppercase tracking-[0.15em] font-sans font-semibold text-gold/70 hover:text-gold transition-colors border-b border-gold/20 pb-0.5"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
