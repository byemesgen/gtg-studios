"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";

const DEFAULT_LOGOS = Array.from({ length: 18 }, (_, i) => ({
  _key: `d${i}`,
  url: `/logos/brands/brand-${String(i + 1).padStart(2, "0")}.svg`,
  alt: `Client ${i + 1}`,
}));

const DEFAULT_HEADING =
  "We work with the biggest brands, broadcasters, agencies and marketers, in collaboration with the best creative minds around.";

export default function Brands({
  heading = DEFAULT_HEADING,
  logos = DEFAULT_LOGOS,
}: {
  heading?: string;
  logos?: { _key: string; url: string; alt?: string }[];
}) {
  const { isMobile, isTablet } = useBreakpoint();

  const cols = isMobile ? 4 : isTablet ? 6 : 9;
  const logoPx = isMobile ? 22 : isTablet ? 26 : 28;
  const cellH = isMobile ? 56 : isTablet ? 64 : 72;
  const cellPad = isMobile ? "14px 10px" : isTablet ? "16px 12px" : "20px 16px";

  return (
    <section
      style={{
        padding: isMobile
          ? "64px 22px 72px"
          : isTablet
          ? "96px 40px 96px 100px"
          : "120px 40px 120px 100px",
      }}
    >
      {/* Intro text */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: isMobile
            ? "clamp(1.35rem, 5.5vw, 1.9rem)"
            : isTablet
            ? "clamp(1.4rem, 2.6vw, 2.2rem)"
            : "clamp(1.5rem, 2.8vw, 2.8rem)",
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          color: "#000",
          maxWidth: isMobile ? "100%" : 680,
          marginBottom: isMobile ? 36 : isTablet ? 48 : 60,
        }}
      >
        {heading}
      </motion.p>

      {/* Logo grid */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04 } },
        }}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        {logos.map((logo) => (
          <motion.div
            key={logo._key}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.4 } },
            }}
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: cellPad,
              minHeight: cellH,
              overflow: "hidden",
            }}
          >
            <img
              src={logo.url}
              alt={logo.alt ?? ""}
              style={{
                height: logoPx,
                maxWidth: "85%",
                objectFit: "contain",
                opacity: 0.7,
                transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                display: "block",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "1";
                el.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "0.7";
                el.style.transform = "scale(1)";
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
