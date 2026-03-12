import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Vertical = "training" | "exposure" | "coaching";
type Step = "segmenting" | "hook" | "confirmation";

const STORAGE_KEY = "qb-stable-intake-dismissed";
const POPUP_DELAY_MS = 5000;

const verticalContent: Record<
  Vertical,
  { header: string; copy: string; cta: string }
> = {
  training: {
    header: "APPLY FOR EVALUATION",
    copy: "Submit your application to be considered for our elite quarterback development program. Evaluations are limited and granted based on commitment level and developmental trajectory.",
    cta: "SUBMIT APPLICATION",
  },
  exposure: {
    header: "THE COLLEGE CONTACT CHEAT SHEET",
    copy: "Get the insider guide our staff uses to reach college recruiting coordinators. The exact outreach methods, timing, and language that get responses across every division level.",
    cta: "GET THE CHEAT SHEET",
  },
  coaching: {
    header: "THE 15-MINUTE INDY BLUEPRINT",
    copy: "The exact arm care routine and everyday drills we use with our NFL and draft prep quarterbacks. Built to implement right away.",
    cta: "DOWNLOAD THE BLUEPRINT",
  },
};

async function submitIntakeForm(
  vertical: Vertical,
  data: { name: string; email: string; phone: string }
) {
  console.log("[IntakePopup] Form submitted:", { vertical, ...data });
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true };
}

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export default function InstitutionalIntakePopup() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("segmenting");
  const [selectedVertical, setSelectedVertical] = useState<Vertical | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [contactError, setContactError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      setStep("segmenting");
      setSelectedVertical(null);
      setFormData({ name: "", email: "", phone: "" });
      setContactError(false);
    }
  }, [open]);

  const handleDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const handleVerticalSelect = useCallback((vertical: Vertical) => {
    setSelectedVertical(vertical);
    setStep("hook");
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedVertical) return;
      if (!formData.email && !formData.phone) {
        setContactError(true);
        return;
      }
      setContactError(false);
      setSubmitting(true);
      try {
        await submitIntakeForm(selectedVertical, formData);
        setStep("confirmation");
      } finally {
        setSubmitting(false);
      }
    },
    [selectedVertical, formData]
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] border border-gold bg-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200 overflow-hidden"
        >
          <DialogTitle className="sr-only">
            Select Your Development Vertical
          </DialogTitle>

          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 z-10 rounded-sm p-1 text-black/40 hover:text-black transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6 sm:p-10 overflow-y-auto max-h-[85vh]">
            <AnimatePresence mode="wait">
              {step === "segmenting" && (
                <motion.div
                  key="segmenting"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-center text-gold text-xs uppercase tracking-[0.1em] font-sans font-semibold mb-3">
                    THE STABLE STANDARD
                  </p>
                  <h2 className="font-serif text-[28px] sm:text-[32px] text-black text-center tracking-[-0.01em] mb-2">
                    CHOOSE YOUR OBJECTIVE
                  </h2>
                  <p className="text-[14px] text-[#666666] text-center font-sans mb-1">
                    Training. Exposure. Coaching.
                  </p>
                  <p className="text-[14px] text-[#666666] text-center font-sans mb-8">
                    Select your focus to begin.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleVerticalSelect("training")}
                      className="w-full border border-black text-black text-[14px] uppercase font-sans font-bold px-6 py-4 bg-white hover:bg-gold hover:text-white hover:border-gold transition-colors"
                    >
                      INITIATE TRAINING EVAL
                    </button>
                    <button
                      onClick={() => handleVerticalSelect("exposure")}
                      className="w-full border border-black text-black text-[14px] uppercase font-sans font-bold px-6 py-4 bg-white hover:bg-gold hover:text-white hover:border-gold transition-colors"
                    >
                      ACCESS RECRUITING GUIDE
                    </button>
                    <button
                      onClick={() => handleVerticalSelect("coaching")}
                      className="w-full border border-black text-black text-[14px] uppercase font-sans font-bold px-6 py-4 bg-white hover:bg-gold hover:text-white hover:border-gold transition-colors"
                    >
                      VIEW PRE-PRACTICE PROTOCOLS
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "hook" && selectedVertical && (
                <motion.div
                  key="hook"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-center text-gold text-[10px] uppercase tracking-[0.3em] font-sans font-semibold mb-3">
                    The QB Stable
                  </p>
                  <h2 className="font-serif text-xl sm:text-2xl text-black text-center mb-2">
                    {verticalContent[selectedVertical].header}
                  </h2>
                  <p className="text-sm text-black/60 text-center font-sans leading-relaxed mb-8">
                    {verticalContent[selectedVertical].copy}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="popup-name" className="sr-only">
                        Full Name
                      </label>
                      <input
                        id="popup-name"
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((d) => ({ ...d, name: e.target.value }))
                        }
                        className="w-full border border-black/15 text-black text-sm px-4 py-3 font-sans placeholder:text-black/30 focus:border-gold focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="popup-email" className="sr-only">
                        Email Address
                      </label>
                      <input
                        id="popup-email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, email: e.target.value }));
                          if (contactError) setContactError(false);
                        }}
                        className={`w-full border text-black text-sm px-4 py-3 font-sans placeholder:text-black/30 focus:border-gold focus:outline-none transition-colors ${contactError && !formData.phone ? "border-red-400" : "border-black/15"}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="popup-phone" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="popup-phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData((d) => ({ ...d, phone: e.target.value }));
                          if (contactError) setContactError(false);
                        }}
                        className={`w-full border text-black text-sm px-4 py-3 font-sans placeholder:text-black/30 focus:border-gold focus:outline-none transition-colors ${contactError && !formData.email ? "border-red-400" : "border-black/15"}`}
                      />
                    </div>
                    {contactError && (
                      <p className="text-xs text-red-500 font-sans -mt-2">
                        Please provide at least an email or phone number.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gold text-black text-xs uppercase tracking-[0.15em] font-sans font-semibold px-6 py-4 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting
                        ? "SUBMITTING..."
                        : verticalContent[selectedVertical].cta}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("segmenting");
                        setSelectedVertical(null);
                        setFormData({ name: "", email: "", phone: "" });
                        setContactError(false);
                      }}
                      className="text-xs text-black/40 font-sans hover:text-black/60 transition-colors text-center"
                    >
                      ← Back to verticals
                    </button>
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
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-6 border border-gold rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl text-black mb-3">
                    Access Request Logged.
                  </h2>
                  <p className="text-sm text-black/60 font-sans leading-relaxed mb-8">
                    Check your inbox to begin the protocol.
                  </p>
                  <a
                    href="#"
                    className="inline-block text-xs uppercase tracking-[0.15em] font-sans font-semibold text-gold hover:text-gold-dark transition-colors border-b border-gold/30 pb-0.5"
                  >
                    THE SUNDAY NIGHT IQ
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
