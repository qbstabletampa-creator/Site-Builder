import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

interface PricingFeature {
  label: string;
  tiers: boolean[];
}

interface PricingTier {
  name: string;
  subtitle: string;
  price: string;
  popular?: boolean;
}

interface PricingConfiguratorProps {
  sectionLabel?: string;
  heading: string;
  tiers: PricingTier[];
  features: PricingFeature[];
  ctaText: string;
  ctaLink: string;
  theme?: "light" | "dark";
}

export default function PricingConfigurator({
  sectionLabel = "Pricing",
  heading,
  tiers,
  features,
  ctaText,
  ctaLink,
  theme = "dark",
}: PricingConfiguratorProps) {
  const [selectedTier, setSelectedTier] = useState(
    tiers.findIndex((t) => t.popular) >= 0 ? tiers.findIndex((t) => t.popular) : 1
  );

  const isDark = theme === "dark";

  return (
    <section data-section="pricing" className={`w-full py-20 md:py-32 px-6 md:px-10 ${isDark ? "bg-black" : "bg-white"}`}>
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <p className={`text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4 text-center ${isDark ? "text-gold" : "text-gold-dark"}`}>
            {sectionLabel}
          </p>
          <h2 className={`font-serif text-3xl md:text-5xl text-center mb-16 ${isDark ? "text-white" : "text-black"}`}>
            {heading}
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-4 overflow-visible" staggerDelay={0.12}>
          {tiers.map((tier, i) => {
            const isSelected = i === selectedTier;
            return (
              <StaggerItem key={tier.name} className="overflow-visible">
                <motion.div
                  className={`relative cursor-pointer text-center transition-colors duration-300 overflow-visible ${
                    tier.popular ? "pt-10 pb-8 px-8 md:pt-12 md:pb-10 md:px-10" : "p-8 md:p-10"
                  } ${
                    isSelected
                      ? isDark
                        ? "bg-white text-black z-10 shadow-2xl"
                        : "bg-black text-white z-10 shadow-2xl"
                      : isDark
                        ? "bg-black text-white border border-white/10 hover:border-gold/40"
                        : "bg-white text-black border border-black/10 hover:border-gold/40"
                  } ${i === 0 ? "md:rounded-l" : ""} ${i === tiers.length - 1 ? "md:rounded-r" : ""}`}
                  onClick={() => setSelectedTier(i)}
                  whileHover={!isSelected ? { y: -4 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  layout
                >
                  {tier.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-black text-[10px] uppercase tracking-wider font-semibold px-4 py-1 whitespace-nowrap z-20">
                      Most Popular
                    </div>
                  )}

                  <p className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-6 ${
                    isSelected ? "text-gold-dark" : isDark ? "text-white/40" : "text-black/40"
                  }`}>
                    {tier.name}
                  </p>

                  <p className="font-serif text-4xl md:text-5xl font-bold mb-2">
                    {tier.price}
                  </p>

                  <p className={`text-sm font-sans ${
                    isSelected
                      ? isDark ? "text-black/50" : "text-white/50"
                      : isDark ? "text-white/50" : "text-black/50"
                  }`}>
                    {tier.subtitle}
                  </p>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <ScrollReveal delay={0.2}>
          <div className={`mt-12 border overflow-hidden ${isDark ? "border-white/10" : "border-black/10"}`}>
            <div className={`grid grid-cols-[1fr_repeat(3,80px)] md:grid-cols-[1fr_repeat(3,120px)] ${isDark ? "bg-white/[0.02]" : "bg-black/[0.02]"}`}>
              <div className={`p-3 md:p-4 border-b ${isDark ? "border-white/10" : "border-black/10"}`}>
                <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-white/40" : "text-black/40"}`}>Feature</span>
              </div>
              {tiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`p-3 md:p-4 border-b border-l text-center ${
                    isDark ? "border-white/10" : "border-black/10"
                  } ${i === selectedTier ? "bg-gold/5" : ""}`}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-wider hidden md:inline ${isDark ? "text-white/60" : "text-black/60"}`}>
                    {tier.name}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-wider md:hidden ${isDark ? "text-white/60" : "text-black/60"}`}>
                    {tier.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>

            {features.map((feature) => (
              <div
                key={feature.label}
                className={`grid grid-cols-[1fr_repeat(3,80px)] md:grid-cols-[1fr_repeat(3,120px)] border-b last:border-b-0 group transition-colors ${
                  isDark ? "border-white/5 hover:bg-gold/[0.02]" : "border-black/5 hover:bg-gold/[0.02]"
                }`}
              >
                <div className="p-3 md:p-4 flex items-center">
                  <span className={`text-sm font-sans ${isDark ? "text-white/70" : "text-black/70"}`}>{feature.label}</span>
                </div>
                {feature.tiers.map((included, i) => (
                  <div
                    key={i}
                    className={`p-3 md:p-4 border-l flex items-center justify-center ${
                      isDark ? "border-white/5" : "border-black/5"
                    } ${i === selectedTier ? "bg-gold/5" : ""}`}
                  >
                    {included ? (
                      <Check size={14} className={i === selectedTier ? "text-gold-dark" : isDark ? "text-white/30" : "text-black/30"} />
                    ) : (
                      <div className={`w-3 h-px ${isDark ? "bg-white/15" : "bg-black/15"}`} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link href={ctaLink}>
              <motion.span
                className={`inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] font-semibold px-10 py-4 cursor-pointer group ${
                  isDark ? "bg-white text-black" : "bg-black text-white"
                }`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(212, 195, 106, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {ctaText}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
