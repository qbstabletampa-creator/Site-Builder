import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import HudOverlay from "./HudOverlay";
import ScrollReveal from "./ScrollReveal";

interface HudMetric {
  label: string;
  value: string;
  unit?: string;
}

interface ProductHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  hudMetrics: HudMetric[];
}

export default function ProductHero({
  eyebrow,
  title,
  description,
  hudMetrics,
}: ProductHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] bg-black pt-24 overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,195,106,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(212,195,106,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <HudOverlay metrics={hudMetrics} />

      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #D4C36A, transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.div
        className="relative max-w-6xl mx-auto w-full px-6 md:px-10 pb-32 md:pb-28 z-10"
        style={{ y: contentY, opacity: contentOpacity, paddingTop: "clamp(8rem, 28vh, 16rem)" }}
      >
        <ScrollReveal delay={0.1}>
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-mono font-semibold mb-4">
            {eyebrow}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
            {title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-white/50 text-base md:text-lg max-w-2xl font-sans leading-relaxed">
            {description}
          </p>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
