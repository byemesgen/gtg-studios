"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const awards = [
  { name: "IFTA",    year: "2024" },
  { name: "Cannes\nLions",  year: "2023" },
  { name: "D&AD",   year: "2024" },
  { name: "Kinsale", year: "2023" },
  { name: "BAFTA",  year: "2024" },
  { name: "Clio",   year: "2023" },
  { name: "Emmy",   year: "2024" },
  { name: "ADFX",   year: "2023" },
];

function Medallion({ name, year, delay }: { name: string; year: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        {/* Outer ring */}
        <circle cx="40" cy="40" r="37" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
        {/* Inner ring */}
        <circle cx="40" cy="40" r="29" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
        {/* Decorative dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 40 + 33 * Math.cos(rad);
          const cy = 40 + 33 * Math.sin(rad);
          return <circle key={angle} cx={cx} cy={cy} r="1.4" fill="rgba(0,0,0,0.3)" />;
        })}
        {/* Award name */}
        <text
          x="40"
          y={name.includes("\n") ? "34" : "43"}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.08em"
          fill="rgba(0,0,0,0.7)"
          fontFamily="inherit"
          style={{ textTransform: "uppercase" }}
        >
          {name.split("\n")[0]}
        </text>
        {name.includes("\n") && (
          <text
            x="40"
            y="46"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.08em"
            fill="rgba(0,0,0,0.7)"
            fontFamily="inherit"
          >
            {name.split("\n")[1]}
          </text>
        )}
        {/* Year */}
        <text
          x="40"
          y={name.includes("\n") ? "58" : "56"}
          textAnchor="middle"
          fontSize="7"
          fill="rgba(0,0,0,0.4)"
          fontFamily="inherit"
          letterSpacing="0.1em"
        >
          {year}
        </text>
      </svg>
    </motion.div>
  );
}

export default function Accolades() {
  const ref = useRef(null);
  useInView(ref, { once: true });

  return (
    <section ref={ref} style={{ padding: "60px 40px 80px 100px" }}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#000",
          marginBottom: 40,
        }}
      >
        Accolades
      </motion.h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 28,
        }}
      >
        {awards.map((a, i) => (
          <Medallion key={a.name} name={a.name} year={a.year} delay={i * 0.07} />
        ))}
      </div>
    </section>
  );
}
