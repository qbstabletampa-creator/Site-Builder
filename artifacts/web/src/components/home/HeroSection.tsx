import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import heroImage from "@assets/IMG_2130_1773271236127.jpeg";
import heroVideo from "@assets/hero-video.mp4";
import stableLogo from "@assets/stable-logo.png";

export default function HeroSection() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative w-full min-h-[100vh] md:min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
      <Link
        href="/"
        className="absolute top-3 left-1/2 -translate-x-1/2 z-20"
      >
        <img
          src={stableLogo}
          alt="The QB Stable"
          className="h-[30px] md:h-[36px] w-auto opacity-80 hover:opacity-100 transition-opacity drop-shadow-lg"
        />
      </Link>
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroImage}
          className="w-full h-full object-cover"
          onCanPlay={() => setVideoReady(true)}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {!videoReady && (
          <img
            src={heroImage}
            alt="Quarterback training session on the field at Beyond The Throw"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[#2a4a6b]/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-10 translate-y-[10%] text-center">
        <motion.h1
          className="font-serif text-[clamp(1.65rem,7vw,7rem)] font-bold text-white leading-[0.95] tracking-tight whitespace-nowrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          BEYOND THE THROW
        </motion.h1>
        <motion.p
          className="mt-4 md:mt-6 text-gold text-xs sm:text-sm uppercase tracking-[0.3em] font-sans font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          From First Rep to First Round
        </motion.p>
      </div>
    </section>
  );
}
