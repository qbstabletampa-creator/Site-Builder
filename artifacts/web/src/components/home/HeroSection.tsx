import heroImage from "@assets/Screenshot_2026-03-11_172752_1773264570462.png";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100vh] md:min-h-[800px] flex flex-col items-center justify-end overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold z-20" />

      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="QB Training Session"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2a4a6b]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </div>

      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-10">
        <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-white/40 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-white/60" fill="currentColor">
            <ellipse cx="12" cy="12" rx="5" ry="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1" />
            <line x1="7.5" y1="8" x2="16.5" y2="8" stroke="currentColor" strokeWidth="0.8" />
            <line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="0.8" />
            <line x1="7.5" y1="16" x2="16.5" y2="16" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-10 pb-16 md:pb-24 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight">
          BEYOND THE THROW
        </h1>
        <p className="mt-4 md:mt-6 text-gold text-xs sm:text-sm uppercase tracking-[0.3em] font-sans font-medium">
          From First Rep to First Round
        </p>
      </div>
    </section>
  );
}
