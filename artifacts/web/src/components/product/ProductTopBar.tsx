import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import WorkWithUsModal from "@/components/WorkWithUsModal";

interface ProductTopBarProps {
  ctaLabel: string;
}

const linkClass =
  "inline-flex items-center text-white/50 text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-sans font-medium hover:text-gold transition-colors cursor-pointer";

export default function ProductTopBar({ ctaLabel }: ProductTopBarProps) {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gold origin-center shadow-[0_0_10px_rgba(212,195,106,0.5)]"
          style={{ scaleX: progress }}
        />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 h-10 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            const el = document.querySelector('[data-section="pricing"]');
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={linkClass}
        >
          Pricing
        </a>

        <button onClick={() => setModalOpen(true)} className={linkClass}>
          {ctaLabel}
        </button>
      </div>

      <WorkWithUsModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
