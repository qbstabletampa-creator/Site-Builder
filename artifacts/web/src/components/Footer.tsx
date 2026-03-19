import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl font-bold mb-4">THE QB STABLE</h3>
            <p className="text-white/45 text-sm leading-relaxed">
              Beyond the throw. Development is not an accident.
            </p>
            <p className="text-white/35 text-xs mt-4 uppercase tracking-wider">
              Tampa, FL
            </p>
          </div>

          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">Services</h4>
            <div className="flex flex-col gap-3">
              <Link href="/academy" className="text-white/50 text-sm hover:text-white transition-colors">Elite Development</Link>
              <Link href="/exposure" className="text-white/50 text-sm hover:text-white transition-colors">Collegiate Exposure</Link>
              <Link href="/consulting" className="text-white/50 text-sm hover:text-white transition-colors">Strategic Consulting</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link href="/faq" className="text-white/50 text-sm hover:text-white transition-colors">FAQ</Link>
              <Link href="/#intake" className="text-white/50 text-sm hover:text-white transition-colors">Apply for Evaluation</Link>
            </div>
          </div>

          <div>
            <h4 className="text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-4">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Twitter / X</a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">&copy; {new Date().getFullYear()} The QB Stable. All rights reserved.</p>
          <p className="text-white/25 text-xs uppercase tracking-wider">Quarterback Training Tampa, FL</p>
        </div>
      </div>
    </footer>
  );
}
