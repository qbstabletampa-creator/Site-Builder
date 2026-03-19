import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black pt-20">
      <div className="text-center px-6">
        <p className="text-gold text-xs uppercase tracking-[0.3em] font-sans font-semibold mb-4">
          404
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/50 text-sm font-sans mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-gold-light transition-colors group"
        >
          Return Home
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
