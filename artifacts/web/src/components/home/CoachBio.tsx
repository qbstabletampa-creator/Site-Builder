import { motion } from "framer-motion";
import coachPhoto from "@assets/IMG_2143_1773316771343.png";

const credentials = [
  "9 NFL Quarterbacks Developed",
  "Super Bowl Champion (Player)",
  "Michael Penix Jr. — 1st Round NFL Draft Pick",
  "40+ D1 Quarterbacks Placed",
  "125+ College Quarterbacks Produced",
  "Tampa Bay–Rooted. Nationally Recognized.",
];

export default function CoachBio() {
  return (
    <section className="w-full bg-black py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-12 md:mb-16"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Coach
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Photo */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={coachPhoto}
              alt="Head Coach — The QB Stable"
              className="w-full aspect-[3/4] object-cover grayscale brightness-75 contrast-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-sans font-semibold mb-1">
                Head Coach & Founder
              </p>
              <p className="text-white font-serif text-2xl md:text-3xl font-semibold">
                The QB Stable
              </p>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight mb-6">
              Development Is Not an Accident.
            </h2>

            <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed mb-6">
              For over a decade, The QB Stable has operated from a single philosophy: great quarterbacks are built, not found. Every rep is engineered with purpose — mechanics, film, IQ, and competitive exposure built into a unified development system.
            </p>

            <p className="text-white/60 text-sm md:text-base font-sans leading-relaxed mb-10">
              Tampa-rooted and nationally recognized, the program has produced quarterbacks at every level of the game — from high school to the Super Bowl. The system doesn't change based on the player's age or pedigree. The standard does not move.
            </p>

            <div className="border-t border-white/10 pt-8">
              <p className="text-gold text-[10px] uppercase tracking-[0.25em] font-sans font-semibold mb-5">
                Track Record
              </p>
              <ul className="space-y-3">
                {credentials.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-white/70">
                    <span className="text-gold/60 text-[8px] mt-[5px] shrink-0">&#9670;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
