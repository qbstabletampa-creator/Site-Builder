import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PillarCardProps {
  headline: string;
  subtext: string;
  keyStat: string;
  cta: string;
  ctaLink: string;
  scarcityTag?: string;
  index: number;
}

function PillarCard({ headline, subtext, keyStat, cta, ctaLink, scarcityTag, index }: PillarCardProps) {
  return (
    <motion.div
      className="relative bg-[#121212] border-t border-[#C5B358] rounded-sm flex flex-col items-center text-center px-6 py-10 md:px-8 md:py-14"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {scarcityTag && (
        <div className="mb-6">
          <span className="bg-[#C5B358] text-black text-[10px] md:text-xs uppercase tracking-[0.15em] font-sans font-bold px-4 py-1.5 rounded-full">
            {scarcityTag}
          </span>
        </div>
      )}

      <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-6 uppercase tracking-[0.05em]">
        {headline}
      </h3>

      <p className="text-sm md:text-[15px] leading-relaxed text-white/60 font-sans mb-8 max-w-sm">
        {subtext}
      </p>

      <p className="text-[#C5B358] text-lg md:text-xl lg:text-2xl font-bold font-sans tracking-wide mb-10">
        {keyStat}
      </p>

      <Link
        href={ctaLink}
        className="inline-flex items-center gap-3 bg-[#C5B358] text-black text-xs uppercase tracking-[0.15em] font-bold px-6 py-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(197,179,88,0.4)] group"
      >
        {cta}
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="w-full bg-black py-28 md:py-40">
      <motion.p
        className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Stable Services
      </motion.p>

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        <PillarCard
          headline="Elite Development"
          subtext="The complete development system. We go Beyond the Throw, integrating elite mechanics with film, board work, reaction based reps, and high stakes competition to create elite signal callers."
          keyStat="$53M+ IN NFL CONTRACTS"
          cta="Apply for Evaluation"
          ctaLink="/academy"
          index={0}
        />
        <PillarCard
          headline="Recruiting Film Blueprint"
          subtext="Strategic highlight engineering curated for college staffs. Includes our coaches contact database, level of play evaluation, and outreach roadmap."
          keyStat="$15M+ IN SCHOLARSHIPS & NIL VALUE"
          cta="Secure Your Slot"
          ctaLink="/exposure"
          scarcityTag="10 Slots Monthly"
          index={1}
        />
        <PillarCard
          headline="The Stable Methodology"
          subtext="FOR COACHES: Optimize every rep and maximize your Indy time. Master the foundations of stability and the consistent movements required for high level QB development."
          keyStat="9 NFL | 40+ D1 | 125+ COLLEGE QBS"
          cta="Book Discovery Call"
          ctaLink="/consulting"
          index={2}
        />
      </div>
    </section>
  );
}
