"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/app/hooks/useIsMobile";

// 8 award badge SVGs in reference order
const ACCOLADE_COUNT = 8;

export default function Accolades() {
  const isMobile = useIsMobile();
  const size = isMobile ? 72 : 90;

  return (
    <section
      style={{
        padding: isMobile ? "40px 22px 56px" : "56px 40px 72px 100px",
      }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: isMobile ? "clamp(1.3rem, 5vw, 1.7rem)" : "clamp(1.4rem, 2.2vw, 2.2rem)",
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
          gap: isMobile ? 14 : 20,
        }}
      >
        {Array.from({ length: ACCOLADE_COUNT }, (_, i) => i + 1).map((n) => (
          <motion.div
            key={n}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (n - 1) * 0.07 }}
            style={{
              width: size,
              height: size,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={`/logos/accolades/accolade-${String(n).padStart(2, "0")}.svg`}
              alt={`Award ${n}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.75,
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.75")}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
