import { motion } from "framer-motion";

interface MediaPlaceholderProps {
  label: string;
  sublabel?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  aspect?: "video" | "square" | "portrait" | "fill";
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  fill: "w-full h-full",
};

export default function MediaPlaceholder({
  label,
  sublabel,
  gradientFrom = "#1a1a1a",
  gradientTo = "#0a0a0a",
  className = "",
  aspect = "video",
}: MediaPlaceholderProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${aspectMap[aspect]} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,195,106,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,195,106,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
        <div className="w-8 h-8 border border-gold/20 rounded-sm flex items-center justify-center">
          <div className="w-3 h-3 border border-gold/30 rounded-full" />
        </div>
        <span className="font-mono text-[10px] text-gold/40 uppercase tracking-[0.2em] text-center">
          {label}
        </span>
        {sublabel && (
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider text-center">
            {sublabel}
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
    </motion.div>
  );
}
