"use client";

import { useState } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const YT_ID = "Bcpu-jqAL6w";

const categories = [
  { label: "Studio",    href: "/work?category=studio" },
  { label: "Directors", href: "/work?category=directors" },
  { label: "VFX",       href: "/work?category=vfx" },
  { label: "Broadcast", href: "/work?category=broadcast" },
  { label: "Originals", href: "/work?category=originals" },
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
      {/* ── YouTube iframe as cover background ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "56.25vw",
          minHeight: "100%",
          minWidth: "177.78vh",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_ID}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none" }}
        />
      </div>

      {/* Gradient — left-heavy so text reads cleanly */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
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
        }}
      >
        {categories.map((cat, i) => (
          <li
            key={cat.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ lineHeight: 1, marginBottom: isMobile ? 2 : 4 }}
          >
            <a
              href={cat.href}
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
