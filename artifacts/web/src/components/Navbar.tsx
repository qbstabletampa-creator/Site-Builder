import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/academy", label: "Academy" },
  { href: "/exposure", label: "Exposure" },
  { href: "/consulting", label: "Consulting" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setProgress(v));
  }, [scrollYProgress]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gold origin-center shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          style={{ scaleX: progress }}
        />
      </div>

      <button
        className="fixed top-3 right-5 md:right-8 z-50 text-gold/80 hover:text-gold transition-colors p-2"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={26} strokeWidth={1.5} />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button
              className="absolute top-3 right-5 md:right-8 text-white/80 hover:text-white transition-colors p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-2xl md:text-3xl tracking-wide transition-colors ${
                      location === link.href
                        ? "text-gold"
                        : "text-white/70 hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.06, duration: 0.4 }}
              >
                <Link
                  href="/#intake"
                  className="mt-4 inline-flex items-center gap-2 bg-gold text-black text-xs uppercase tracking-[0.2em] font-semibold px-8 py-3 hover:bg-gold-light transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Apply Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
