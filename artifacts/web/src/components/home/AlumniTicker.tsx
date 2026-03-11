import { motion } from "framer-motion";

import falconsLogo from "@assets/logos/falcons.png";
import chiefsLogo from "@assets/logos/chiefs.png";
import ravensLogo from "@assets/logos/ravens.png";
import dolphinsLogo from "@assets/logos/dolphins.png";
import texansLogo from "@assets/logos/texans.png";
import seahawksLogo from "@assets/logos/seahawks.png";
import steelersLogo from "@assets/logos/steelers.png";
import brownsLogo from "@assets/logos/browns.png";
import jetsLogo from "@assets/logos/jets.png";

import pennStateLogo from "@assets/logos/penn-state.png";
import auburnLogo from "@assets/logos/auburn.png";
import clemsonLogo from "@assets/logos/clemson.png";
import washingtonLogo from "@assets/logos/washington.png";
import iowaStateLogo from "@assets/logos/iowa-state.png";
import nebraskaLogo from "@assets/logos/nebraska.png";
import usfLogo from "@assets/logos/usf.png";
import indianaLogo from "@assets/logos/indiana.png";
import miamiLogo from "@assets/logos/miami.png";
import virginiaLogo from "@assets/logos/virginia.svg";

const logos = [
  { name: "Atlanta Falcons", src: falconsLogo },
  { name: "Kansas City Chiefs", src: chiefsLogo },
  { name: "Baltimore Ravens", src: ravensLogo },
  { name: "Miami Dolphins", src: dolphinsLogo },
  { name: "Houston Texans", src: texansLogo },
  { name: "Seattle Seahawks", src: seahawksLogo },
  { name: "Pittsburgh Steelers", src: steelersLogo },
  { name: "Cleveland Browns", src: brownsLogo },
  { name: "New York Jets", src: jetsLogo },
  { name: "Penn State", src: pennStateLogo },
  { name: "Auburn", src: auburnLogo },
  { name: "Clemson", src: clemsonLogo },
  { name: "Washington", src: washingtonLogo },
  { name: "Iowa State", src: iowaStateLogo },
  { name: "Nebraska", src: nebraskaLogo },
  { name: "USF", src: usfLogo },
  { name: "Indiana", src: indianaLogo },
  { name: "Miami Hurricanes", src: miamiLogo },
  { name: "Virginia", src: virginiaLogo },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex-shrink-0 mx-5 md:mx-8 flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
      <img
        src={src}
        alt={name}
        className="max-h-10 md:max-h-14 max-w-14 md:max-w-16 w-auto h-auto object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function AlumniTicker() {
  const doubled = [...logos, ...logos];

  return (
    <motion.section
      className="w-full bg-white py-10 md:py-14 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee">
          {doubled.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>

      <motion.p
        className="text-center mt-8 text-xs uppercase tracking-[0.25em] text-black/60 font-sans font-semibold"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Trusted by the Best
      </motion.p>
    </motion.section>
  );
}
