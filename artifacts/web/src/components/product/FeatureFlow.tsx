import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { MetricBadge } from "./HudOverlay";
import MediaPlaceholder from "./MediaPlaceholder";

interface Feature {
  title: string;
  description: string;
  metric?: { value: string; label: string };
}

interface FeatureFlowProps {
  sectionLabel: string;
  features: Feature[];
  theme?: "light" | "dark";
  mediaSlots?: { label: string; sublabel: string }[];
}

export default function FeatureFlow({
  sectionLabel,
  features,
  theme = "light",
  mediaSlots,
}: FeatureFlowProps) {
  const isDark = theme === "dark";

  return (
    <section className={`w-full py-20 md:py-32 px-6 md:px-10 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-px bg-gold/40" />
            <p className={`text-xs uppercase tracking-[0.3em] font-sans font-semibold ${isDark ? "text-gold" : "text-gold-dark"}`}>
              {sectionLabel}
            </p>
            <div className={`flex-1 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`} />
          </div>
        </ScrollReveal>

        <StaggerContainer className="space-y-0" staggerDelay={0.1}>
          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 py-12 md:py-16 border-b ${
                    isDark ? "border-white/5" : "border-black/5"
                  } ${!isEven ? "md:flex-row-reverse" : ""}`}
                  whileHover={{ x: isEven ? 4 : -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs tabular-nums ${isDark ? "text-white/20" : "text-black/20"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className={`w-6 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`} />
                    </div>

                    <h3 className={`font-serif text-2xl md:text-3xl font-semibold ${isDark ? "text-white" : "text-black"}`}>
                      {feature.title}
                    </h3>

                    <p className={`text-sm leading-relaxed font-sans max-w-lg ${isDark ? "text-white/50" : "text-black/60"}`}>
                      {feature.description}
                    </p>

                    {feature.metric && (
                      <div className="pt-2">
                        <MetricBadge value={feature.metric.value} label={feature.metric.label} theme={theme} />
                      </div>
                    )}
                  </div>

                  {mediaSlots && mediaSlots[i] && (
                    <div className="w-full md:w-80 flex-shrink-0">
                      <MediaPlaceholder
                        label={mediaSlots[i].label}
                        sublabel={mediaSlots[i].sublabel}
                        gradientFrom={isDark ? "#1a1a1a" : "#f5f5f0"}
                        gradientTo={isDark ? "#0a0a0a" : "#e8e8e0"}
                        aspect="video"
                      />
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
