import { useRef, useEffect, useState } from "react";

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

const variants = [
  {
    id: "gold-chrome",
    label: "Gold Chrome",
    bgColor: "#FFFFFF",
    edgeGradientFrom: "#FFFFFF",
    logoFilter: "grayscale(100%) sepia(60%) saturate(300%) hue-rotate(15deg) brightness(88%)",
    shimmerOverlay: true,
  },
  {
    id: "dark-chrome",
    label: "Dark Chrome (Gunmetal)",
    bgColor: "#1a1a1e",
    edgeGradientFrom: "#1a1a1e",
    logoFilter: "grayscale(100%) brightness(140%) contrast(120%) sepia(5%) hue-rotate(180deg)",
    shimmerOverlay: false,
  },
  {
    id: "black-gold",
    label: "Black & Gold Chrome",
    bgColor: "#000000",
    edgeGradientFrom: "#000000",
    logoFilter: "grayscale(100%) sepia(80%) saturate(400%) hue-rotate(15deg) brightness(95%) contrast(110%)",
    shimmerOverlay: false,
  },
  {
    id: "full-color",
    label: "Full Color",
    bgColor: "#FFFFFF",
    edgeGradientFrom: "#FFFFFF",
    logoFilter: "none",
    shimmerOverlay: false,
  },
];

function LogoItem({ name, src, filter }: { name: string; src: string; filter: string }) {
  return (
    <div className="flex-shrink-0 mx-4 md:mx-6 flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-contain"
        style={{ filter }}
        loading="lazy"
      />
    </div>
  );
}

function TickerStrip({
  bgColor,
  edgeGradientFrom,
  logoFilter,
  shimmerOverlay,
}: {
  bgColor: string;
  edgeGradientFrom: string;
  logoFilter: string;
  shimmerOverlay: boolean;
}) {
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

  return (
    <section
      className="w-full py-10 md:py-14 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10"
          style={{ background: `linear-gradient(to right, ${edgeGradientFrom}, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10"
          style={{ background: `linear-gradient(to left, ${edgeGradientFrom}, transparent)` }}
        />

        {shimmerOverlay && (
          <div
            className="absolute inset-0 z-[5] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(212,195,106,0.06) 25%, rgba(212,195,106,0.12) 50%, rgba(212,195,106,0.06) 75%, transparent 100%)",
            }}
          />
        )}

        <div
          ref={trackRef}
          className="flex"
          style={
            halfWidth > 0
              ? { width: halfWidth * 2, animation: "ticker-scroll 60s linear infinite" }
              : { width: "max-content" }
          }
        >
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} filter={logoFilter} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TickerPicker() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = variants[activeIdx];
  const isDark = active.bgColor !== "#FFFFFF";

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: active.bgColor }}
    >
      <div className="pt-28 pb-8 text-center">
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
          style={{
            fontFamily: "Playfair Display, serif",
            color: isDark ? "#FFFFFF" : "#000000",
          }}
        >
          Ticker Color Variants
        </h1>
        <p
          className="text-sm tracking-wide uppercase"
          style={{
            fontFamily: "Inter, sans-serif",
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
          }}
        >
          Select a style to preview
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pb-10 px-4 flex-wrap">
        {variants.map((v, i) => (
          <button
            key={v.id}
            onClick={() => setActiveIdx(i)}
            className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer"
            style={{
              fontFamily: "Inter, sans-serif",
              backgroundColor:
                i === activeIdx
                  ? "#D4C36A"
                  : isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
              color: i === activeIdx ? "#000000" : isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              borderColor:
                i === activeIdx
                  ? "#D4C36A"
                  : isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.12)",
              transform: i === activeIdx ? "scale(1.05)" : "scale(1)",
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <TickerStrip
        bgColor={active.bgColor}
        edgeGradientFrom={active.edgeGradientFrom}
        logoFilter={active.logoFilter}
        shimmerOverlay={active.shimmerOverlay}
      />

      <p
        className="text-center mt-8 text-xs tracking-[0.3em] uppercase"
        style={{
          fontFamily: "Inter, sans-serif",
          color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
        }}
      >
        {active.label}
      </p>
    </div>
  );
}
