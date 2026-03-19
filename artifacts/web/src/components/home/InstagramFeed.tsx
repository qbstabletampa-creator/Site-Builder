import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Instagram Live Feed — uses Instagram's oEmbed + embed.js to render
 * native Instagram post cards. Falls back to a styled link grid if
 * embeds can't load (e.g., ad blockers).
 *
 * For auto-updating without a backend, we load Instagram's embed.js
 * which renders posts natively. Post URLs can be updated periodically
 * or replaced with an Elfsight/SnapWidget script for fully automatic feeds.
 */

const INSTAGRAM_HANDLE = "theqbstable";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

// Recent post URLs from @theqbstable — these render via Instagram's embed.js
const RECENT_POSTS = [
  "https://www.instagram.com/p/DHTg2e2xyFx/",
  "https://www.instagram.com/p/DHMjEWQRzbi/",
  "https://www.instagram.com/p/DHCEq3xxwpn/",
  "https://www.instagram.com/p/DG9cHsyxNT_/",
  "https://www.instagram.com/p/DG7AabdR-3U/",
  "https://www.instagram.com/p/DGrhpv9xxPY/",
];

function InstagramPostEmbed({ url, index }: { url: string; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create the blockquote that Instagram's embed.js transforms
    const blockquote = document.createElement("blockquote");
    blockquote.className = "instagram-media";
    blockquote.setAttribute("data-instgrm-captioned", "");
    blockquote.setAttribute("data-instgrm-permalink", url);
    blockquote.setAttribute("data-instgrm-version", "14");
    blockquote.style.cssText =
      "background:#000;border:0;border-radius:8px;margin:0;max-width:100%;min-width:280px;padding:0;width:100%;";

    // Add a loading link inside
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View on Instagram";
    link.style.cssText = "color:#d4c36a;text-decoration:none;font-size:12px;";
    blockquote.appendChild(link);

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(blockquote);

    // Process the embed using Instagram's script
    const timer = setTimeout(() => {
      if ((window as any).instgrm?.Embeds) {
        (window as any).instgrm.Embeds.process();
        setLoaded(true);
      }
    }, 300 + index * 200);

    // Fallback: if not loaded after 5s, show fallback
    const fallbackTimer = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [url, index]);

  if (failed && !loaded) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-square bg-[#111] border border-white/5 rounded-lg overflow-hidden group hover:border-gold/30 transition-all duration-300"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <svg
            className="w-8 h-8 text-gold/40 group-hover:text-gold/60 transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono group-hover:text-white/50 transition-colors">
            View Post
          </span>
        </div>
      </a>
    );
  }

  return (
    <div
      ref={containerRef}
      className="instagram-embed-container [&_.instagram-media]:!m-0 [&_.instagram-media]:!max-w-full [&_.instagram-media]:!min-w-0 [&_.instagram-media]:!w-full [&_iframe]:!rounded-lg"
    />
  );
}

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Load Instagram embed script once
  useEffect(() => {
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) return;

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Don't remove on unmount — other components might need it
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-black overflow-hidden"
    >
      {/* Subtle gold gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
            >
              <svg
                className="w-5 h-5 text-gold group-hover:text-gold-light transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="text-xs text-gold/60 uppercase tracking-[0.25em] font-mono group-hover:text-gold transition-colors">
                @{INSTAGRAM_HANDLE}
              </span>
            </a>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">
            The Stable Feed
          </h2>
          <p className="mt-3 text-sm text-white/40 max-w-md mx-auto">
            Follow the journey. Training highlights, alumni wins, and the
            culture behind the brand.
          </p>
        </motion.div>

        {/* Post grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {RECENT_POSTS.map((url, i) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <InstagramPostEmbed url={url} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA to follow */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold text-xs uppercase tracking-[0.2em] font-mono hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 rounded"
          >
            Follow @{INSTAGRAM_HANDLE}
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Bottom gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
