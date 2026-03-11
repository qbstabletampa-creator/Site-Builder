import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  items: string[];
  cta: string;
  ctaLink: string;
  imageColor: string;
  index: number;
}

function ServiceCard({ title, items, cta, ctaLink, imageColor, index }: ServiceCardProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-sm overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: imageColor }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 border border-white/20 px-4 py-2">
            <span className="text-white/60 text-xs uppercase tracking-[0.2em] font-sans">Training Preview</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-10">
            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 text-[9px] text-white/80 font-mono uppercase">
              HUD Active
            </div>
            <div className="bg-gold/80 px-2 py-1 text-[9px] text-black font-mono uppercase">
              Live Data
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
        <h3 className="font-serif text-2xl md:text-3xl italic font-semibold text-black mb-6">
          {title}
        </h3>

        <ul className="space-y-3 mb-8">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check size={16} className="text-black mt-0.5 flex-shrink-0" />
              <span className="text-sm uppercase tracking-[0.1em] text-black/70 font-sans">{item}</span>
            </li>
          ))}
        </ul>

        <Link
          href={ctaLink}
          className="inline-flex items-center gap-3 bg-black text-white text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 w-fit hover:bg-black/80 transition-colors group"
        >
          {cta}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <motion.p
        className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Stable Services
      </motion.p>

      <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-12 md:space-y-16">
        <ServiceCard
          title="Elite Development"
          items={["QB Academy", "1 on 1 + Elite Small Groups", "NFL Draft Prep", "College + NFL Training"]}
          cta="Apply for Evaluation"
          ctaLink="/academy"
          imageColor="#1a2a3a"
          index={0}
        />
        <ServiceCard
          title="Collegiate Exposure"
          items={["Custom Curated Highlight", "College Coaches Contact Database", "Recruiting Evaluation", "Scholarship & NIL Marketing"]}
          cta="Request Highlight Assessment"
          ctaLink="/exposure"
          imageColor="#2a3a2a"
          index={1}
        />
        <ServiceCard
          title="Strategic Consulting"
          items={["Indy Architecture Audit", "Reactive Drill Protocols", "Closed Loop vs Open Loop Drills", "Mechanics and Sequencing"]}
          cta="Schedule Indy Audit"
          ctaLink="/consulting"
          imageColor="#3a2a1a"
          index={2}
        />
      </div>
    </section>
  );
}
