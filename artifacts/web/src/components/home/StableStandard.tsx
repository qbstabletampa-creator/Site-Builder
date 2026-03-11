const standards = [
  {
    title: "Neural Plasticity",
    description: "We rewire decision-making patterns through repetition-based cognitive training. Every drill is designed to build faster processing under pressure."
  },
  {
    title: "360° Audit",
    description: "A comprehensive biomechanical and film evaluation that dissects every angle of a quarterback's mechanics, footwork, and release."
  },
  {
    title: "Recruitment Pipeline",
    description: "Direct access to our network of college coaches, scouts, and NFL evaluators built over a decade of consistent output and proven development."
  },
  {
    title: "Institutional Longevity",
    description: "5+ years operating from the same facility. The deepest QB network in the country. Consistency is the standard — not the exception."
  },
];

export default function StableStandard() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <p className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-12">
        The Stable Standard
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 border-t border-l border-black/10">
        {standards.map((item) => (
          <div
            key={item.title}
            className="border-r border-b border-black/10 p-10 md:p-[60px] text-left"
          >
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-black mb-4">
              {item.title}
            </h3>
            <p className="text-sm text-black/60 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
