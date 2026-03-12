import { motion } from "framer-motion";

const placeholderReviews = [
  {
    quote: "The most comprehensive quarterback development program in the country. Every detail is accounted for.",
    name: "Athlete Testimonial",
    title: "D1 Quarterback",
  },
  {
    quote: "They don't just train arms — they build complete quarterbacks. The film work and IQ development is unmatched.",
    name: "Coach Review",
    title: "College Coach",
  },
  {
    quote: "From mechanics to recruiting, The QB Stable handled every aspect of my son's development.",
    name: "Parent Testimonial",
    title: "QB Parent",
  },
];

export default function ReviewVault() {
  return (
    <section className="w-full bg-black py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-12"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Review Vault
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {placeholderReviews.map((review, i) => (
            <motion.div
              key={i}
              className="bg-white/[0.04] rounded-sm p-8 md:p-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <p className="text-white/65 text-sm leading-relaxed font-sans mb-8">
                "{review.quote}"
              </p>
              <div>
                <p className="text-white text-sm font-semibold font-sans">{review.name}</p>
                <p className="text-white/35 text-xs uppercase tracking-wider mt-1 font-sans">{review.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
