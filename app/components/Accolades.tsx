"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const awards = [
  { name: "IFTA",    sub: "Best Commercial" },
  { name: "Cannes",  sub: "Lions Finalist" },
  { name: "D&AD",    sub: "Wood Pencil" },
  { name: "Kinsale", sub: "Gold Shark" },
  { name: "BAFTA",   sub: "Craft Award" },
  { name: "Clio",    sub: "Bronze" },
  { name: "Emmy",    sub: "Nominated" },
  { name: "ADFX",    sub: "Effectiveness" },
];

function Medallion({ name, sub, size, delay }: { name: string; sub: string; size: number; delay: number }) {
  const r1 = size * 0.46;
  const r2 = size * 0.36;
  const cx = size / 2;
  const dotAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <circle cx={cx} cy={cx} r={r1} stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" />
        <circle cx={cx} cy={cx} r={r2} stroke="rgba(0,0,0,0.18)" strokeWidth="0.7" />
        {dotAngles.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <circle
              key={angle}
              cx={cx + (r1 + 2) * Math.cos(rad)}
              cy={cx + (r1 + 2) * Math.sin(rad)}
              r="1.2"
              fill="rgba(0,0,0,0.25)"
            />
          );
        })}
        <text
          x={cx} y={cx - 3}
          textAnchor="middle"
          fontSize={size * 0.13}
          fontWeight="700"
          letterSpacing="0.06em"
          fill="rgba(0,0,0,0.7)"
          fontFamily="inherit"
        >
          {name}
        </text>
        <text
          x={cx} y={cx + size * 0.13}
          textAnchor="middle"
          fontSize={size * 0.09}
          fill="rgba(0,0,0,0.4)"
          fontFamily="inherit"
          letterSpacing="0.04em"
        >
          {sub}
        </text>
      </svg>
    </motion.div>
  );
}

export default function Accolades() {
  const isMobile = useIsMobile();
  const size = isMobile ? 70 : 88;

  return (
    <section
      style={{
        padding: isMobile
          ? "40px 22px 56px"
          : "56px 40px 72px 100px",
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: isMobile
            ? "clamp(1.3rem, 5vw, 1.7rem)"
            : "clamp(1.4rem, 2.2vw, 2.2rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#000",
          marginBottom: isMobile ? 28 : 36,
        }}
      >
        Accolades
      </motion.h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobile ? 16 : 24,
        }}
      >
        {awards.map((a, i) => (
          <Medallion key={a.name} name={a.name} sub={a.sub} size={size} delay={i * 0.07} />
        ))}
      </div>
    </section>
  );
}
