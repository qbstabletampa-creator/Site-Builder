import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll } from "framer-motion";
import stableLogo from "@assets/stable-logo.png";
import WorkWithUsModal from "@/components/WorkWithUsModal";

export default function Navbar() {
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
          className="h-full bg-gold origin-center shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          style={{ scaleX: progress }}
        />
      </div>

      <Link
        href="/"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-50"
      >
        <img
          src={stableLogo}
          alt="The QB Stable"
          className="h-[30px] md:h-[36px] w-auto opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg"
        />
      </Link>

      <button
        onClick={() => setModalOpen(true)}
        className="fixed top-4 right-4 md:right-6 z-50 inline-flex items-center bg-transparent border border-gold/40 text-gold/70 text-[7px] md:text-[8px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 hover:bg-gold/10 hover:border-gold/70 hover:text-gold transition-colors whitespace-nowrap"
      >
        Work With Us
      </button>

      <WorkWithUsModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
