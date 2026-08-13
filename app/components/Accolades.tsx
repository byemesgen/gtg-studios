"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";

const DEFAULT_LOGOS = Array.from({ length: 8 }, (_, i) => ({
  _key: `d${i}`,
  url: `/logos/accolades/accolade-${String(i + 1).padStart(2, "0")}.svg`,
  alt: `Award ${i + 1}`,
}));

export default function Accolades({
  heading = "Accolades",
  logos = DEFAULT_LOGOS,
}: {
  heading?: string;
  logos?: { _key: string; url: string; alt?: string }[];
}) {
  const { isMobile, isTablet } = useBreakpoint();
  const size = isMobile ? 72 : isTablet ? 82 : 96;

  return (
    <section
      style={{
        padding: isMobile
          ? "64px 22px 80px"
          : isTablet
          ? "80px 40px 96px 100px"
          : "100px 40px 120px 100px",
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: isMobile
            ? "clamp(1.3rem, 5vw, 1.7rem)"
            : isTablet
            ? "clamp(1.4rem, 2vw, 2rem)"
            : "clamp(1.4rem, 2.2vw, 2.2rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "#000",
          marginBottom: isMobile ? 32 : isTablet ? 40 : 48,
        }}
      >
        {heading}
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-30px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: isMobile ? 16 : isTablet ? 20 : 24,
        }}
      >
        {logos.map((logo) => (
          <motion.div
            key={logo._key}
            variants={{
              hidden: { opacity: 0, scale: 0.82, y: 12 },
              show: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            style={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={logo.url}
              alt={logo.alt ?? ""}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.72,
                transition:
                  "opacity 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.35s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "1";
                el.style.transform = "scale(1.1) translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "0.72";
                el.style.transform = "scale(1) translateY(0)";
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
