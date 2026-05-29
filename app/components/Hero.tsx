"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const words = ["Stories.", "Emotions.", "Worlds."];

export default function Hero() {
  const cycleRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % words.length;
      if (cycleRef.current) {
        cycleRef.current.style.opacity = "0";
        cycleRef.current.style.transform = "translateY(12px)";
        setTimeout(() => {
          if (cycleRef.current) {
            cycleRef.current.textContent = words[indexRef.current];
            cycleRef.current.style.opacity = "1";
            cycleRef.current.style.transform = "translateY(0)";
          }
        }, 300);
      }
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const scrollToWork = () => {
    document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 max-w-7xl mx-auto"
    >
      {/* Subtle background grain */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="pt-24"
      >
        <p className="text-[#6b6b6b] text-xs tracking-[0.3em] uppercase mb-8">
          Film &amp; Video Production
        </p>

        <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-light leading-[1.05] tracking-tight text-[#f0ede8] max-w-5xl">
          We create{" "}
          <span
            ref={cycleRef}
            style={{
              transition: "opacity 0.3s ease, transform 0.3s ease",
              display: "inline-block",
              color: "var(--accent)",
            }}
          >
            {words[0]}
          </span>
        </h1>

        <p className="mt-8 text-[#6b6b6b] text-base md:text-lg max-w-xl leading-relaxed">
          GTG Studios is a full-service production company fusing cinematic
          craft with strategic storytelling — for brands and audiences that
          demand more.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <button
            onClick={scrollToWork}
            className="px-8 py-3.5 bg-[#c8a96e] text-[#080808] text-sm tracking-widest uppercase font-medium hover:bg-[#d4b87a] transition-colors duration-300"
          >
            View Our Work
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-3.5 border border-[#2e2e2e] text-[#f0ede8] text-sm tracking-widest uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors duration-300"
          >
            Get in Touch
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-6 md:left-10 flex items-center gap-3"
      >
        <div className="w-10 h-px bg-[#2e2e2e]" />
        <span className="text-[#6b6b6b] text-xs tracking-[0.25em] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
