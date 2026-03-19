import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface HudMetric {
  label: string;
  value: string;
  unit?: string;
}

interface HudOverlayProps {
  metrics: HudMetric[];
  position?: "left" | "right" | "both";
}

function MetricReadout({ metric, delay }: { metric: HudMetric; delay: number }) {
  return (
    <ScrollReveal delay={delay} direction="none" duration={0.5}>
      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl md:text-3xl lg:text-4xl font-bold text-gold tabular-nums tracking-tight">
            {metric.value}
          </span>
          {metric.unit && (
            <span className="font-mono text-xs text-gold/60 uppercase tracking-wider">
              {metric.unit}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-gold/40" />
          <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
            {metric.label}
          </span>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function HudOverlay({ metrics, position = "both" }: HudOverlayProps) {
  const leftMetrics = position === "right" ? [] : metrics.slice(0, 2);
  const rightMetrics = position === "left" ? [] : metrics.slice(position === "right" ? 0 : 2, 4);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      <div className="absolute top-4 left-4 w-3 h-3 border-l border-t border-gold/30" />
      <div className="absolute top-4 right-4 w-3 h-3 border-r border-t border-gold/30" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-l border-b border-gold/30" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-r border-b border-gold/30" />

      {leftMetrics.length > 0 && (
        <div className="hidden lg:flex absolute left-8 lg:left-12 top-[15%] flex-col gap-8">
          {leftMetrics.map((m, i) => (
            <MetricReadout key={m.label} metric={m} delay={0.4 + i * 0.15} />
          ))}
        </div>
      )}

      {rightMetrics.length > 0 && (
        <div className="hidden lg:flex absolute right-8 lg:right-12 top-[15%] flex-col gap-8 items-end text-right">
          {rightMetrics.map((m, i) => (
            <MetricReadout key={m.label} metric={m} delay={0.5 + i * 0.15} />
          ))}
        </div>
      )}

      <div className="flex lg:hidden absolute bottom-8 left-6 right-6">
        <div className="grid grid-cols-2 gap-4 w-full">
          {metrics.slice(0, 4).map((m, i) => (
            <ScrollReveal key={m.label} delay={0.3 + i * 0.1} direction="none" duration={0.4}>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-lg font-bold text-gold tabular-nums">
                  {m.value}
                </span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.15em]">
                  {m.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold/30"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
      />
    </div>
  );
}

export function MetricBadge({ value, label, theme = "light" }: { value: string; label: string; theme?: "light" | "dark" }) {
  const isDark = theme === "dark";
  return (
    <div className={`inline-flex items-center gap-2 border px-3 py-1.5 ${isDark ? "border-gold/20 bg-gold/5" : "border-gold-dark/20 bg-gold/5"}`}>
      <span className={`font-mono text-sm font-bold tabular-nums ${isDark ? "text-gold" : "text-gold-dark"}`}>{value}</span>
      <span className={`font-mono text-[10px] uppercase tracking-wider ${isDark ? "text-white/50" : "text-black/50"}`}>{label}</span>
    </div>
  );
}
