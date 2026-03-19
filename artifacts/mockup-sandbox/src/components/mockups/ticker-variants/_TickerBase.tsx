import { useRef, useEffect, useState } from "react";

const logos = [
  { name: "Atlanta Falcons", src: "/__mockup/images/logos/falcons.png" },
  { name: "Kansas City Chiefs", src: "/__mockup/images/logos/chiefs.png" },
  { name: "Baltimore Ravens", src: "/__mockup/images/logos/ravens.png" },
  { name: "Miami Dolphins", src: "/__mockup/images/logos/dolphins.png" },
  { name: "Houston Texans", src: "/__mockup/images/logos/texans.png" },
  { name: "Seattle Seahawks", src: "/__mockup/images/logos/seahawks.png" },
  { name: "Pittsburgh Steelers", src: "/__mockup/images/logos/steelers.png" },
  { name: "Cleveland Browns", src: "/__mockup/images/logos/browns.png" },
  { name: "New York Jets", src: "/__mockup/images/logos/jets.png" },
  { name: "Penn State", src: "/__mockup/images/logos/penn-state.png" },
  { name: "Auburn", src: "/__mockup/images/logos/auburn.png" },
  { name: "Clemson", src: "/__mockup/images/logos/clemson.png" },
  { name: "Washington", src: "/__mockup/images/logos/washington.png" },
  { name: "Iowa State", src: "/__mockup/images/logos/iowa-state.png" },
  { name: "Nebraska", src: "/__mockup/images/logos/nebraska.png" },
  { name: "USF", src: "/__mockup/images/logos/usf.png" },
  { name: "Indiana", src: "/__mockup/images/logos/indiana.png" },
  { name: "Miami Hurricanes", src: "/__mockup/images/logos/miami.png" },
  { name: "Virginia", src: "/__mockup/images/logos/virginia.svg" },
  { name: "Army", src: "/__mockup/images/logos/army.svg" },
  { name: "Boston College", src: "/__mockup/images/logos/boston-college.png" },
  { name: "Charlotte", src: "/__mockup/images/logos/charlotte.svg" },
  { name: "New Mexico State", src: "/__mockup/images/logos/new-mexico-state.svg" },
  { name: "South Alabama", src: "/__mockup/images/logos/south-alabama.png" },
  { name: "UNLV", src: "/__mockup/images/logos/unlv.png" },
  { name: "Navy", src: "/__mockup/images/logos/navy.png" },
];

interface TickerBaseProps {
  bgColor: string;
  edgeGradientFrom: string;
  logoFilter: string;
  shimmerOverlay?: boolean;
}

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

export default function TickerBase({ bgColor, edgeGradientFrom, logoFilter, shimmerOverlay }: TickerBaseProps) {
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
            className="absolute inset-0 z-5 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, rgba(212, 195, 106, 0.06) 25%, rgba(212, 195, 106, 0.12) 50%, rgba(212, 195, 106, 0.06) 75%, transparent 100%)`,
            }}
          />
        )}

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
            <LogoItem key={`${logo.name}-${i}`} name={logo.name} src={logo.src} filter={logoFilter} />
          ))}
        </div>
      </div>
    </section>
  );
}
