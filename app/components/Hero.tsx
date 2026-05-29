"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const [showreel, setShowreel] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col justify-between px-6 md:px-14 pt-36 pb-12 overflow-hidden"
      >
        {/* Grain overlay */}
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "256px 256px",
          }}
        />

        {/* Top row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <p className="text-[#3a3a3a] text-[10px] tracking-[0.35em] uppercase">
            Film &nbsp;·&nbsp; Video &nbsp;·&nbsp; Production
          </p>
          <p className="hidden md:block text-[#3a3a3a] text-[10px] tracking-[0.35em] uppercase">
            Dublin &nbsp;·&nbsp; Worldwide
          </p>
        </motion.div>

        {/* Main headline — fills vertical space */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="my-auto py-16"
        >
          <h1
            className="font-light leading-[0.95] tracking-[-0.02em] text-[#f0ede8]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 9.5rem)" }}
          >
            <span className="block">We tell stories</span>
            <span className="block">that&nbsp;
              <span className="italic text-[#c8a96e]">move</span>
            </span>
            <span className="block">people.</span>
          </h1>
        </motion.div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-[#2e2e2e]" />
            <span className="text-[#3a3a3a] text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <p className="text-[#6b6b6b] text-sm leading-relaxed max-w-xs">
              A full-service production company crafting cinematic narratives
              for brands and audiences that demand more.
            </p>

            {/* Showreel button */}
            <button
              onClick={() => setShowreel(true)}
              className="group flex items-center gap-4 shrink-0"
              aria-label="Play showreel"
            >
              <div className="relative w-14 h-14 rounded-full border border-[#2e2e2e] group-hover:border-[#c8a96e] transition-colors duration-500 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-[#6b6b6b] group-hover:text-[#c8a96e] transition-colors duration-500 ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
                </svg>
                {/* Rotating ring */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  viewBox="0 0 56 56"
                >
                  <circle
                    cx="28" cy="28" r="26"
                    fill="none"
                    stroke="#c8a96e"
                    strokeWidth="0.5"
                    strokeDasharray="163"
                    strokeDashoffset="163"
                    className="group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-700"
                  />
                </svg>
              </div>
              <span className="text-[#6b6b6b] group-hover:text-[#c8a96e] text-[10px] tracking-[0.3em] uppercase transition-colors duration-500">
                Play Showreel
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Showreel lightbox */}
      <AnimatePresence>
        {showreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setShowreel(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl"
              style={{ aspectRatio: "16/9" }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/pLJVdaj7K6A?autoplay=1&rel=0&modestbranding=1"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
              <button
                onClick={() => setShowreel(false)}
                className="absolute -top-10 right-0 text-[#6b6b6b] hover:text-[#f0ede8] text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
