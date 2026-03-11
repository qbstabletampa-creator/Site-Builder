import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqCategories = [
  {
    category: "Training & Development",
    items: [
      {
        q: "What is your training philosophy?",
        a: "We treat quarterbacking as an architectural discipline. Every session is designed around neural plasticity, biomechanical efficiency, and cognitive processing. Development is not an accident — it's engineered."
      },
      {
        q: "What age groups do you work with?",
        a: "We train quarterbacks from middle school through the professional level. Each program is tailored to the athlete's developmental stage, physical maturity, and competitive goals."
      },
      {
        q: "How are training sessions structured?",
        a: "Sessions follow a progressive protocol: warm-up activation, mechanical refinement, cognitive processing drills, live situational work, and film review debrief. Every rep has purpose."
      },
      {
        q: "Do you offer group training?",
        a: "Yes. Our QB Academy provides elite small group training that combines the benefits of competition with individualized coaching. Groups are capped to maintain quality."
      },
      {
        q: "What makes your approach different from other QB coaches?",
        a: "We don't just throw. We combine biomechanical audits, neural plasticity training, film study, eye-discipline work, and recruiting management. This is truly beyond the throw."
      },
    ],
  },
  {
    category: "Recruiting & Exposure",
    items: [
      {
        q: "Do you help with college recruiting?",
        a: "Absolutely. Our Collegiate Exposure program includes custom highlight editing, coach outreach, recruiting evaluation, and strategic positioning for scholarship opportunities."
      },
      {
        q: "What schools have your athletes signed with?",
        a: "Our alumni network spans Power Five programs, Group of Five schools, FCS programs, and Division II/III institutions. We've produced 40+ D1 quarterbacks and 120+ college quarterbacks total."
      },
      {
        q: "Do you provide NIL guidance?",
        a: "Yes. Our exposure program includes NIL strategy and valuation services. We help athletes understand and maximize their name, image, and likeness value throughout the recruiting process."
      },
      {
        q: "When should my son start the recruiting process?",
        a: "The earlier the better. We recommend beginning formal recruiting preparation by sophomore year of high school, though foundational development should start much earlier."
      },
    ],
  },
  {
    category: "Logistics & Location",
    items: [
      {
        q: "Where are you located?",
        a: "We operate out of our flagship facility in Tampa, Florida. We've been at the same location for over 5 years — institutional consistency is part of our standard."
      },
      {
        q: "Do you offer remote services?",
        a: "Yes. Film review, IQ training, recruiting management, and consulting services can all be conducted remotely. In-person training is recommended for biomechanical development."
      },
      {
        q: "How do I get started?",
        a: "Fill out our Intake Application. Our team will review your submission within 48 hours and schedule an initial evaluation to assess your current level and build a development plan."
      },
      {
        q: "What is the evaluation process?",
        a: "The initial evaluation is a comprehensive 360° audit covering mechanics, footwork, decision-making, arm strength, and mental processing. This data drives your entire development plan."
      },
    ],
  },
  {
    category: "Consulting & Programs",
    items: [
      {
        q: "What does Strategic Consulting include?",
        a: "Our consulting service provides practice architecture audits, custom drill design, reactive drill protocols, mechanics sequencing, and ongoing program support for coaches and organizations."
      },
      {
        q: "Do you work with high school and college coaching staffs?",
        a: "Yes. We consult with coaching staffs at every level to optimize their quarterback development programs, drill design, and practice structure."
      },
      {
        q: "Can you design a custom training program for our team?",
        a: "Absolutely. Our Program Build package includes a complete practice architecture overhaul, custom drill library, implementation training, and quarterly progress reviews."
      },
    ],
  },
];

let faqCounter = 0;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const [id] = useState(() => faqCounter++);
  const panelId = `faq-page-panel-${id}`;
  const buttonId = `faq-page-btn-${id}`;
  return (
    <div className="border-b border-black/10">
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
          className={`flex-shrink-0 text-black/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm text-black/60 leading-relaxed font-sans pr-8">{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <>
      <section className="relative w-full min-h-[50vh] flex items-end bg-black pt-20">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
        <div className="max-w-6xl mx-auto w-full px-6 md:px-10 pb-16 md:pb-24">
          <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4">
            Institutional Deep Dive
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            FAQ
          </h1>
          <p className="mt-6 text-white/60 text-base md:text-lg max-w-2xl font-sans leading-relaxed">
            Everything you need to know about The QB Stable, our training methodology, recruiting services, and how to get started.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((cat) => (
            <div key={cat.category} className="mb-12 last:mb-0">
              <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-6">
                {cat.category}
              </p>
              <div className="border-t border-black/10">
                {cat.items.map((faq) => (
                  <FaqItem key={faq.q} {...faq} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-black py-16 md:py-20 px-6 md:px-10 text-center">
        <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4">
          Ready to Start?
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
          Apply for Your Evaluation
        </h2>
        <Link
          href="/#intake"
          className="inline-flex items-center gap-3 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-8 py-4 hover:bg-gold-light transition-colors group"
        >
          Begin Application
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </>
  );
}
