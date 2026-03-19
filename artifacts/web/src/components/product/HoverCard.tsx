import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
  scaleAmount?: number;
  glowColor?: string;
}

export default function HoverCard({
  children,
  className = "",
  liftAmount = -6,
  scaleAmount = 1.02,
  glowColor = "rgba(212, 195, 106, 0.15)",
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: liftAmount,
        scale: scaleAmount,
        boxShadow: `0 20px 40px rgba(0,0,0,0.2), 0 0 30px ${glowColor}`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function GoldButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      className={`inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
