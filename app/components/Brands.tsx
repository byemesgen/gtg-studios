"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";

// 18 brand logos in reference order
const BRAND_COUNT = 18;

export default function Brands() {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        padding: isMobile ? "44px 22px 52px" : "80px 40px 80px 100px",
      }}
    >
      {/* Intro text */}
      <p
        style={{
          fontSize: isMobile ? "clamp(1.4rem, 5.5vw, 1.9rem)" : "clamp(1.5rem, 2.8vw, 2.8rem)",
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(9, 1fr)",
          border: "1px solid rgba(0,0,0,0.18)",
        }}
      >
        {Array.from({ length: BRAND_COUNT }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            style={{
              border: "1px solid rgba(0,0,0,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "14px 10px" : "20px 16px",
              minHeight: isMobile ? 56 : 72,
            }}
          >
            <img
              src={`/logos/brands/brand-${String(n).padStart(2, "0")}.svg`}
              alt={`Client ${n}`}
              style={{
                height: isMobile ? 22 : 28,
                maxWidth: "85%",
                objectFit: "contain",
                opacity: 0.75,
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = "0.75")}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
