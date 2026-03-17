import { motion } from "framer-motion";

const lines = ["DEVELOPMENT", "IS NOT AN", "ACCIDENT"];

const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function AuthorityStatement() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#000000", paddingTop: "40vh", paddingBottom: "40vh" }}
    >
      <motion.div
        className="relative z-10 flex flex-col items-center px-6 md:px-12 lg:px-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ gap: 40 }}
      >
        <div
          style={{
            width: 100,
            height: 1,
            backgroundColor: "#D4C36A",
          }}
        />
        <h2
          className="text-center flex flex-col items-center"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className="block whitespace-nowrap"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 8rem)",
                color: "#D4C36A",
              }}
            >
              {line}
            </span>
          ))}
        </h2>
        <div
          style={{
            width: 100,
            height: 1,
            backgroundColor: "#D4C36A",
          }}
        />
      </motion.div>
    </section>
  );
}
