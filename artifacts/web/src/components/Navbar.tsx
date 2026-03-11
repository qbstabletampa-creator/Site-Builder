import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/academy", label: "Academy" },
  { href: "/exposure", label: "Exposure" },
  { href: "/consulting", label: "Consulting" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white font-serif text-lg md:text-xl font-bold tracking-wide">THE QB STABLE</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                location === link.href
                  ? "text-gold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/#intake"
          className="hidden md:inline-flex items-center gap-2 bg-gold text-black text-xs uppercase tracking-[0.15em] font-semibold px-5 py-2.5 hover:bg-gold-light transition-colors"
        >
          Apply Now
        </Link>

        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-[0.15em] ${
                  location === link.href ? "text-gold" : "text-white/70"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#intake"
              className="bg-gold text-black text-sm uppercase tracking-[0.15em] font-semibold px-5 py-3 text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
