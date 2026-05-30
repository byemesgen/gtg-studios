"use client";

import { useState } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const YT_ID = "pLJVdaj7K6A";

const categories = [
  { label: "Studio",    id: "studio" },
  { label: "Directors", id: "directors" },
  { label: "VFX",       id: "vfx" },
  { label: "Broadcast", id: "broadcast" },
  { label: "Originals", id: "originals" },
];

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section
      id="work"
      style={{
        position: "relative",
        height: isMobile ? "clamp(300px, 58vh, 500px)" : "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.5)",
          transition: "filter 0.5s ease",
        }}
      />

      {/* Left gradient so text is always readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Category links */}
      <ul
        style={{
          position: "relative",
          zIndex: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: isMobile ? 22 : "clamp(40px, 8vw, 140px)",
          listStyle: "none",
          gap: 0,
        }}
      >
        {categories.map((cat, i) => (
          <li
            key={cat.id}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ lineHeight: 1, marginBottom: isMobile ? 2 : 4 }}
          >
            <a
              href={`#work-${cat.id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                textDecoration: "none",
                fontSize: isMobile
                  ? "clamp(2rem, 9vw, 3rem)"
                  : "clamp(2.8rem, 7vw, 8rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color:
                  hovered === i
                    ? "#EB2A24"
                    : hovered !== null
                    ? "rgba(255,255,255,0.3)"
                    : "#ffffff",
                transition: "color 0.3s ease",
              }}
            >
              {cat.label}
              {hovered === i && !isMobile && (
                <svg width="24" height="24" fill="none" stroke="#EB2A24" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
