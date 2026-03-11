import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const features = [
  {
    title: "Indy Architecture Audit",
    description: "A complete teardown of your practice structure, drill selection, and session flow. We rebuild your individual workout architecture from the ground up."
  },
  {
    title: "Reactive Drill Protocols",
    description: "Drill design that prioritizes read-react processing over scripted repetition. Train decision-making, not just mechanics."
  },
  {
    title: "Closed Loop vs Open Loop Drills",
    description: "Understanding when to use predictable vs. chaotic training environments. We build drill progressions that mirror game conditions."
  },
  {
    title: "Mechanics & Sequencing",
    description: "Biomechanical analysis of throwing mechanics with sequenced correction protocols. Fix the root cause, not the symptom."
  },
];

const included = [
  "Full Practice Architecture Review",
  "Custom Drill Library Creation",
  "Video Analysis & Feedback",
  "Coaching Staff Consultation",
  "Season-Long Program Design",
  "Quarterly Progress Reviews",
];

export default function Consulting() {
  useSEO({
    title: "Strategic Consulting | Practice Architecture & Drill Design — The QB Stable",
    description: "Quarterback biomechanics consulting and drill protocol design for coaches and programs. Indy architecture audits, reactive drill protocols, and custom program builds.",
  });
  return (
    <>
      <section className="relative w-full min-h-[60vh] flex items-end bg-black pt-20">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
        <div className="max-w-6xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4">
            Strategic Consulting
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Practice Architecture
          </h1>
          <p className="mt-6 text-white/60 text-base md:text-lg max-w-2xl font-sans leading-relaxed">
            Quarterback biomechanics consulting and drill protocol design for coaches and programs seeking the competitive edge.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-12">
            Consulting Services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-black/10">
            {features.map((feature) => (
              <div key={feature.title} className="border-r border-b border-black/10 p-8 md:p-12">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-black py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-8 text-center">
            What's Included
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3 py-3 border-b border-white/10">
                <Check size={16} className="text-gold flex-shrink-0" />
                <span className="text-white/80 text-sm font-sans">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4 text-center">
            Pricing
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-black text-center mb-12">
            Consulting Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-black/10 p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 font-sans mb-4">Single Audit</p>
              <p className="font-serif text-3xl font-bold text-black mb-2">Contact</p>
              <p className="text-sm text-black/50 font-sans">One-time review</p>
            </div>
            <div className="border-2 border-gold p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] uppercase tracking-wider font-semibold px-3 py-1">
                Most Popular
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 font-sans mb-4">Season Package</p>
              <p className="font-serif text-3xl font-bold text-black mb-2">Contact</p>
              <p className="text-sm text-black/50 font-sans">Full season support</p>
            </div>
            <div className="border border-black/10 p-8 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 font-sans mb-4">Program Build</p>
              <p className="font-serif text-3xl font-bold text-black mb-2">Contact</p>
              <p className="text-sm text-black/50 font-sans">Complete overhaul</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/#intake"
              className="inline-flex items-center gap-3 bg-black text-white text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 hover:bg-black/80 transition-colors group"
            >
              Schedule Indy Audit
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
