import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MediaPlaceholder from "./MediaPlaceholder";

interface ParallaxCard {
  label: string;
  sublabel: string;
  gradientFrom: string;
  gradientTo: string;
}

interface ParallaxCardsProps {
  cards: ParallaxCard[];
  sectionLabel?: string;
}

export default function ParallaxCards({ cards, sectionLabel }: ParallaxCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full bg-black hidden md:block"
        style={{ height: `${(cards.length + 1) * 100}vh` }}
      >
        {sectionLabel && (
          <motion.div
            className="sticky top-0 z-[1] flex items-center justify-center pt-20 pb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold">
              {sectionLabel}
            </p>
          </motion.div>
        )}

        <div className="sticky top-0 h-screen overflow-hidden">
          {cards.map((card, i) => (
            <StackingCard
              key={card.label}
              card={card}
              index={i}
              total={cards.length}
              containerRef={containerRef}
            />
          ))}
        </div>
      </section>

      <section className="w-full bg-black py-16 px-6 md:hidden">
        {sectionLabel && (
          <motion.p
            className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {sectionLabel}
          </motion.p>
        )}
        <div className="space-y-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-lg">
                <MediaPlaceholder
                  label={card.label}
                  sublabel={card.sublabel}
                  gradientFrom={card.gradientFrom}
                  gradientTo={card.gradientTo}
                  className="absolute inset-0"
                  aspect="fill"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <span className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
                  </span>
                  <div className="w-8 h-px bg-gold/20" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

function StackingCard({
  card,
  index,
  total,
  containerRef,
}: {
  card: ParallaxCard;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segmentStart = index / (total + 1);
  const segmentEnd = (index + 1) / (total + 1);

  const y = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    ["100%", "0%"]
  );

  const scale = useTransform(
    scrollYProgress,
    [segmentEnd, Math.min(segmentEnd + 0.15, 1)],
    [1, 0.92]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center p-12"
      style={{
        y: index === 0 ? 0 : y,
        scale: index === total - 1 ? 1 : scale,
        zIndex: index + 1,
      }}
    >
      <div className="relative w-full h-full max-w-6xl mx-auto overflow-hidden rounded-sm shadow-2xl">
        <MediaPlaceholder
          label={card.label}
          sublabel={card.sublabel}
          gradientFrom={card.gradientFrom}
          gradientTo={card.gradientTo}
          className="absolute inset-0"
          aspect="fill"
        />
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
          <div>
            <span className="font-mono text-[10px] text-gold/60 uppercase tracking-[0.2em]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="w-12 h-px bg-gold/20" />
        </div>
      </div>
    </motion.div>
  );
}
