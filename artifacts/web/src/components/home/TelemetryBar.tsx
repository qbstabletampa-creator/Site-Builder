import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface StatProps {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  index: number;
}

function Stat({ prefix = "", value, suffix = "", label, index }: StatProps) {
  const { count, ref } = useCountUp(value, 1200);
  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center justify-center py-8 md:py-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <span className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-black">
        {prefix}{count}{suffix}
      </span>
      <span className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/50 font-sans font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
}

export default function TelemetryBar() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          <Stat prefix="$" value={53} suffix="+" label="Mil in NFL Contracts" index={0} />
          <Stat prefix="$" value={15} suffix="+" label="Mil in Scholarships" index={1} />
          <Stat prefix="$" value={11} suffix="+" label="Mil in NIL Value" index={2} />
        </div>

        <div className="w-full h-[1px] bg-black/5" />

        <div className="grid grid-cols-2 sm:grid-cols-4">
          <Stat value={9} label="NFL QBs" index={3} />
          <Stat value={40} suffix="+" label="D1 QBs" index={4} />
          <Stat value={125} suffix="+" label="College QBs" index={5} />
          <Stat value={50} suffix="+" label="Yrs QB Coach Exp" index={6} />
        </div>
      </div>
    </section>
  );
}
