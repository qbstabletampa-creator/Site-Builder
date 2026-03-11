const teams = [
  { name: "Steelers", color: "#FFB612", bg: "#101820" },
  { name: "Falcons", color: "#A71930", bg: "#000000" },
  { name: "Ravens", color: "#241773", bg: "#000000" },
  { name: "Texans", color: "#03202F", bg: "#A71930" },
  { name: "Browns", color: "#FF3C00", bg: "#311D00" },
  { name: "Dolphins", color: "#008E97", bg: "#FC4C02" },
  { name: "Chiefs", color: "#E31837", bg: "#FFB81C" },
];

function TeamLogo({ name, color, bg }: { name: string; color: string; bg: string }) {
  return (
    <div
      className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 mx-6 md:mx-8"
      style={{ backgroundColor: bg, border: `2px solid ${color}` }}
    >
      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>
        {name.slice(0, 3)}
      </span>
    </div>
  );
}

export default function AlumniTicker() {
  const doubled = [...teams, ...teams];

  return (
    <section className="w-full bg-white py-10 md:py-14 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee">
          {doubled.map((team, i) => (
            <TeamLogo key={`${team.name}-${i}`} {...team} />
          ))}
        </div>
      </div>

      <p className="text-center mt-8 text-xs uppercase tracking-[0.25em] text-black/70 font-sans font-semibold">
        Trusted by the Best
      </p>
    </section>
  );
}
