"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const brands = [
  "Prime Video", "Sky Studios",   "Paramount+",   "HBO",
  "Netflix",     "Virgin Media",  "Al Jazeera",   "Juventus",
  "Takara Tomy", "Kellogg's",     "Public Groupe","Javelin",
  "Havas",       "VML",           "Ogilvy",       "TBWA\\",
  "Droga5",      "GS&P",
];

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        padding: isMobile
          ? "44px 22px 52px"
          : "80px 40px 80px 100px",
      }}
    >
      {/* Intro text */}
      <p
        style={{
          fontSize: isMobile
            ? "clamp(1.4rem, 5.5vw, 1.9rem)"
            : "clamp(1.5rem, 2.8vw, 2.8rem)",
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "#000",
          maxWidth: isMobile ? "100%" : 680,
          marginBottom: isMobile ? 32 : 52,
        }}
      >
        We work with the biggest brands, broadcasters, agencies and marketers,
        in collaboration with the best creative minds around.
      </p>

      {/* Logo grid */}
      <motion.div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(9, 1fr)",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        {brands.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "16px 8px" : "22px 12px",
              minHeight: isMobile ? 52 : 68,
            }}
          >
            <span
              style={{
                fontSize: isMobile ? 8 : 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.5)",
                textAlign: "center",
                fontWeight: 600,
                transition: "color 0.3s",
                lineHeight: 1.3,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.5)")}
            >
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
