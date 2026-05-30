"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Placeholder brand names — replace with real logos/SVGs when available
const brands = [
  "Prime Video", "Sky Studios", "Paramount+", "HBO",
  "Netflix",     "Virgin Media","Al Jazeera",  "Juventus",
  "Takara Tomy", "Kellogg's",   "Public Groupe","Javelin",
  "Havas",       "VML",         "Ogilvy",      "TBWA\\",
  "Droga5",      "GS&P",
];

export default function Brands() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "80px 40px 80px 100px" }}>
      {/* Intro text */}
      <p
        style={{
          fontSize: "clamp(1.5rem, 2.8vw, 2.8rem)",
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "#000",
          maxWidth: 700,
          marginBottom: 60,
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
          gridTemplateColumns: "repeat(9, 1fr)",
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
              padding: "22px 12px",
              minHeight: 72,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.55)",
                textAlign: "center",
                fontWeight: 500,
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}
            >
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
