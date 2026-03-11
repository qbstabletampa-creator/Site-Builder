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
        <p className="text-center text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-12">
          The Review Vault
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {placeholderReviews.map((review, i) => (
            <div key={i} className="border border-white/10 p-8 md:p-10">
              <p className="text-white/70 text-sm leading-relaxed font-sans italic mb-8">
                "{review.quote}"
              </p>
              <div>
                <p className="text-white text-sm font-semibold font-sans">{review.name}</p>
                <p className="text-white/40 text-xs uppercase tracking-wider mt-1 font-sans">{review.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
