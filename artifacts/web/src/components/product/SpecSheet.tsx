import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

interface SpecItem {
  label: string;
  detail?: string;
}

interface SpecSheetProps {
  items: SpecItem[];
  sectionLabel?: string;
  theme?: "light" | "dark";
}

export default function SpecSheet({ items, sectionLabel = "What's Included", theme = "light" }: SpecSheetProps) {
  const isDark = theme === "dark";

  return (
    <section className={`w-full py-20 md:py-32 px-6 md:px-10 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-14">
            <div className="w-8 h-px bg-gold/40" />
            <p className={`text-xs uppercase tracking-[0.3em] font-mono font-semibold ${isDark ? "text-gold" : "text-gold-dark"}`}>
              {sectionLabel}
            </p>
            <div className={`flex-1 h-px ${isDark ? "bg-gold/10" : "bg-black/10"}`} />
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.06}>
          {items.map((item, i) => (
            <StaggerItem key={item.label} direction="up" distance={20}>
              <motion.div
                className={`flex items-center gap-6 py-5 ${
                  i < items.length - 1
                    ? `border-b ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`
                    : ""
                }`}
                whileHover={{ x: 4, backgroundColor: isDark ? "rgba(212, 195, 106, 0.02)" : "rgba(212, 195, 106, 0.04)" }}
                transition={{ duration: 0.2 }}
              >
                <span className={`font-mono text-[11px] tabular-nums w-8 flex-shrink-0 ${isDark ? "text-white/15" : "text-black/15"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-1.5 h-1.5 bg-gold/50 flex-shrink-0 rounded-full" />

                <span className={`text-sm font-sans flex-1 ${isDark ? "text-white/80" : "text-black/80"}`}>
                  {item.label}
                </span>

                <span className={`text-xs font-mono hidden md:block ${isDark ? "text-white/30" : "text-black/30"}`}>
                  {item.detail || "Included"}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.3}>
          <div className={`mt-8 pt-6 border-t ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"} flex items-center gap-2`}>
            <div className={`w-2 h-2 border ${isDark ? "border-gold/30" : "border-gold-dark/30"}`} />
            <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-white/20" : "text-black/20"}`}>
              {items.length} specifications — all tiers
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
