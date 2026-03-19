import { Link } from "wouter";
import { motion } from "framer-motion";

const standards = [
  {
    title: "Reps & Reaction",
    subtitle: "Train at the speed of the game. Every rep is earned, never choreographed.",
    link: "/academy",
    cta: "Explore the Academy",
    bullets: [
      { label: "Elite Volume", text: "High coach to player ratios and a relentless pace for maximum cognitive growth." },
      { label: "Zero Scripting", text: "No \"ball\" yells or coach claps. We train reactions, not choreography." },
      { label: "Game Logic", text: "Every throw is a response to the environment: leverage, timing, and scrambles." },
      { label: "True Development", text: "We build QBs who see the field, not just the drill." },
    ],
  },
  {
    title: "From First Rep to First Round",
    subtitle: "A complete career lifecycle. We don't just throw. We build complete QBs.",
    link: "/exposure",
    cta: "Get Noticed",
    bullets: [
      { label: "The Blueprint", text: "Comprehensive development from your first drop to NFL Draft prep." },
      { label: "Mental Mastery", text: "Integrated film study and board work to sharpen your football IQ." },
      { label: "The Pipeline", text: "Strategic high school placement and high level college recruiting/NIL exposure." },
      { label: "Pro Pedigree", text: "Specialized training for college starters and professional athletes." },
    ],
  },
  {
    title: "The Method",
    subtitle: "Simplify. Optimize. Dominate.",
    link: "/consulting",
    cta: "Learn the Method",
    bullets: [
      { label: "Air Raid Roots", text: "Strip the noise. Master high volume, high efficiency execution." },
      { label: "Pro Grade Movement", text: "NFL level mechanics refined through our professional coaching network." },
      { label: "Building Adaptation", text: "Closed and open loop drills blended for game speed decision making." },
      { label: "The Design Factor", text: "Every drill is built to create game like environments and force real time reactions." },
    ],
  },
];

export default function StableStandard() {
  return (
    <section id="stable-standard" className="w-full bg-white py-16 md:py-24">
      <motion.p
        className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        The Stable Standard
      </motion.p>

      <motion.h2
        className="text-center font-serif text-3xl md:text-4xl font-bold text-black mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Built Different
      </motion.h2>

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {standards.map((item, i) => (
          <motion.div
            key={item.title}
            className="p-8 md:p-10 bg-black/[0.02] rounded-sm flex flex-col h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-black mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-black/70 font-sans italic mb-5">
              {item.subtitle}
            </p>
            <ul className="space-y-2.5 mb-6">
              {item.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="text-sm text-black/55 leading-relaxed font-sans flex items-start gap-2"
                >
                  <span className="text-gold/50 text-[8px] mt-[5px] shrink-0">&#9670;</span>
                  <span>
                    <strong className="text-black/75">{bullet.label}:</strong>{" "}
                    {bullet.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Link
                href={item.link}
                className="inline-block text-[11px] uppercase tracking-[0.12em] font-semibold text-gold border border-gold/60 px-4 py-2 rounded-sm hover:bg-gold/10 hover:border-gold transition-all duration-300"
              >
                {item.cta}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
