import { Link } from "wouter";
import { motion } from "framer-motion";

interface PillarCardProps {
  title: string;
  subtext: string;
  proofStat: string;
  cta: string;
  ctaLink: string;
  index: number;
  scarcityTag?: string;
}

function PillarCard({ title, subtext, proofStat, cta, ctaLink, index, scarcityTag }: PillarCardProps) {
  return (
    <motion.div
      className="h-full flex flex-col items-center text-center px-8 py-14 md:py-20 border-t border-t-gold"
      style={{ backgroundColor: "#121212" }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      {scarcityTag && (
        <span className="bg-gold text-black text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-6">
          {scarcityTag}
        </span>
      )}

      <h3 className="font-serif text-2xl md:text-3xl font-bold text-white uppercase tracking-[0.15em] mb-6">
        {title}
      </h3>

      <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed max-w-sm mb-10">
        {subtext}
      </p>

      <p className="text-gold font-mono text-base md:text-lg font-bold uppercase tracking-[0.1em] mb-10">
        {proofStat}
      </p>

      <div className="mt-auto" />

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Link
          href={ctaLink}
          className="inline-flex items-center bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-7 py-3 hover:shadow-[0_0_20px_rgba(197,179,88,0.5)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {cta}
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="w-full bg-black py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-12">
        <PillarCard
          title="Elite Development"
          subtext='We go "Beyond the Throw," developing elite mechanics, film study, board work, reaction-based reps, and high-stakes competition. Combined with recruiting guidance to position you for the next level.'
          proofStat="$53M+ IN NFL CONTRACTS"
          cta="Apply for Evaluation"
          ctaLink="/academy"
          index={0}
        />
        <PillarCard
          title="Recruiting Film Blueprint"
          subtext="Strategic highlight engineering curated for college staffs. Your best plays, polished & positioned for the next level. Includes our coaches contact database, level of play evaluation, and outreach roadmap."
          proofStat="$15M+ IN SCHOLARSHIPS | $11M+ IN NIL"
          cta="Secure Your Slot"
          ctaLink="/exposure"
          index={1}
          scarcityTag="10 SLOTS MONTHLY"
        />
        <PillarCard
          title="The Stable Methodology"
          subtext="FOR COACHES: Optimize every rep and maximize your Indy time. Master the foundations of stability and the consistent movements required for high level QB development."
          proofStat="9 NFL | 40+ D1 | 125+ COLLEGE QBS"
          cta="Book Discovery Call"
          ctaLink="/consulting"
          index={2}
        />
      </div>
    </section>
  );
}
