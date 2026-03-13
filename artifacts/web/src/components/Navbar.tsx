import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { useLocation } from "wouter";
import WorkWithUsModal from "@/components/WorkWithUsModal";

const PRODUCT_PAGES = ["/academy", "/exposure", "/consulting"];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [location] = useLocation();

  const isProductPage = PRODUCT_PAGES.includes(location);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  if (isProductPage) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gold origin-center shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          style={{ scaleX: progress }}
        />
      </div>

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
