import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What age groups do you train?",
    a: "We work with quarterbacks from middle school through the professional level. Our programs are tailored to the athlete's developmental stage and goals."
  },
  {
    q: "Where are you located?",
    a: "We operate out of our flagship facility in Tampa, FL. We've been at the same location for over 5 years, providing a consistent, professional training environment."
  },
  {
    q: "How do I get started?",
    a: "Fill out the intake application below. Our team will review your submission and schedule an initial evaluation to assess your current level and create a development plan."
  },
  {
    q: "Do you offer remote training?",
    a: "Yes. Our film review, IQ training, and recruiting management services can be conducted remotely. In-person training is recommended for biomechanical development."
  },
  {
    q: "What makes The QB Stable different?",
    a: "We treat quarterbacking as an architectural discipline. Our approach combines neural plasticity training, biomechanical audits, film study, and recruiting management — truly beyond the throw."
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-btn-${index}`;
  return (
    <motion.div
      className="border-b border-black/5"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <button
        id={buttonId}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-serif text-base md:text-lg font-medium text-black pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-black/30 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-black/55 leading-relaxed font-sans pr-8">{a}</p>
      </div>
    </motion.div>
  );
}

export default function FaqIntake() {
  return (
    <>
      <section className="w-full bg-white py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <motion.p
            className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-12"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.p>
          <div className="border-t border-black/5">
            {faqs.map((faq, i) => (
              <FaqItem key={faq.q} {...faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="intake" className="w-full bg-black py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <motion.p
            className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Begin Your Evaluation
          </motion.p>
          <motion.h2
            className="font-serif text-3xl md:text-4xl text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Intake Application
          </motion.h2>

          <motion.form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="intake-name" className="sr-only">Full Name</label>
                <input
                  id="intake-name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="intake-email" className="sr-only">Email Address</label>
                <input
                  id="intake-email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="intake-phone" className="sr-only">Phone Number</label>
                <input
                  id="intake-phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="intake-position" className="sr-only">Position</label>
                <input
                  id="intake-position"
                  type="text"
                  placeholder="Position"
                  className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="intake-school" className="sr-only">School / Organization</label>
                <input
                  id="intake-school"
                  type="text"
                  placeholder="School / Organization"
                  className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="intake-gradyear" className="sr-only">Graduation Year</label>
                <input
                  id="intake-gradyear"
                  type="text"
                  placeholder="Graduation Year"
                  className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label htmlFor="intake-goals" className="sr-only">Tell us about your goals</label>
              <textarea
                id="intake-goals"
                rows={4}
                placeholder="Tell us about your goals..."
                className="w-full bg-transparent border border-white/15 text-white text-sm px-4 py-3 font-sans placeholder:text-white/25 focus:border-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-6 py-4 hover:bg-gold-light transition-colors group"
            >
              Submit Application
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
