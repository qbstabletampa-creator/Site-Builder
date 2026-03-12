import { motion } from "framer-motion";

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
    <section id="stable-standard" className="w-full bg-white py-16 md:py-24">
      <motion.p
        className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        The Stable Standard
      </motion.p>

      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {standards.map((item, i) => (
          <motion.div
            key={item.title}
            className="p-8 md:p-10 bg-black/[0.02] rounded-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-black mb-4">
              {item.title}
            </h3>
            <p className="text-sm text-black/55 leading-relaxed font-sans">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
