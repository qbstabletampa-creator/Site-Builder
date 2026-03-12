import { useRef, useEffect, useState } from "react";
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

import armyLogo from "@assets/logos/army.svg";
import bostonCollegeLogo from "@assets/logos/boston-college.png";
import charlotteLogo from "@assets/logos/charlotte.svg";
import newMexicoStateLogo from "@assets/logos/new-mexico-state.svg";
import southAlabamaLogo from "@assets/logos/south-alabama.png";
import unlvLogo from "@assets/logos/unlv.png";
import navyLogo from "@assets/logos/navy.png";

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
  { name: "Army", src: armyLogo },
  { name: "Boston College", src: bostonCollegeLogo },
  { name: "Charlotte", src: charlotteLogo },
  { name: "New Mexico State", src: newMexicoStateLogo },
  { name: "South Alabama", src: southAlabamaLogo },
  { name: "UNLV", src: unlvLogo },
  { name: "Navy", src: navyLogo },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex-shrink-0 mx-4 md:mx-6 flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

export default function AlumniTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = useState(0);

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const children = trackRef.current.children;
      const count = logos.length;
      let w = 0;
      for (let i = 0; i < count; i++) {
        w += (children[i] as HTMLElement).offsetWidth;
        const style = getComputedStyle(children[i] as HTMLElement);
        w += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      setHalfWidth(w);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const animationDuration = 60;

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

        <div
          ref={trackRef}
          className="flex"
          style={
            halfWidth > 0
              ? {
                  width: halfWidth * 2,
                  animation: `ticker-scroll ${animationDuration}s linear infinite`,
                }
              : { width: "max-content" }
          }
        >
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </div>

      <motion.a
        href="#intake"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          document.getElementById("intake")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mx-auto mt-8 block w-fit cursor-pointer rounded-full border border-[#C5B358]/40 bg-white/60 px-5 py-1.5 text-xs uppercase tracking-[0.25em] text-black/60 font-sans font-semibold backdrop-blur"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Train with the Best
      </motion.a>
    </motion.section>
  );
}
