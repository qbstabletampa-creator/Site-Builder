import { useCountUp } from "@/hooks/useCountUp";

interface StatProps {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

function Stat({ prefix = "", value, suffix, label }: StatProps) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-6 md:py-8 px-4">
      <span className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-black">
        {prefix}{count}{suffix}
      </span>
      <span className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/60 font-sans font-medium text-center">
        {label}
      </span>
    </div>
  );
}

export default function TelemetryBar() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-black/10">
        <div className="border-b sm:border-b-0 sm:border-r border-black/10">
          <Stat prefix="$" value={53} suffix="+" label="Mil in NFL Contracts" />
        </div>
        <div className="border-b sm:border-b-0 sm:border-r border-black/10">
          <Stat prefix="$" value={15} suffix="+" label="Mil in Scholarships" />
        </div>
        <div>
          <Stat prefix="$" value={11} suffix="+" label="Mil in NIL Value" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-black/10">
        <div className="border-b sm:border-b-0 border-r border-black/10">
          <Stat value={9} suffix="+" label="NFL QBs" />
        </div>
        <div className="border-b sm:border-b-0 sm:border-r border-black/10">
          <Stat value={40} suffix="+" label="D1 QBs" />
        </div>
        <div className="border-r border-black/10">
          <Stat value={120} suffix="+" label="College QBs" />
        </div>
        <div>
          <Stat value={50} suffix="+" label="QB Coach Exp" />
        </div>
      </div>
    </section>
  );
}
