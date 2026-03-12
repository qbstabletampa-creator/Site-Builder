import { motion } from "framer-motion";

export default function AuthorityStatement() {
  return (
    <section className="w-full bg-black py-28 md:py-40 px-6 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gold font-semibold leading-tight tracking-tight"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          DEVELOPMENT IS NOT AN ACCIDENT
        </motion.h2>
      </div>
    </section>
  );
}
