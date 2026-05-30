"use client";

import { useState, useEffect } from "react";

// Work categories — mirrors Piranha Bar's content_call_actions structure
const categories = [
  { label: "Commercial",  bg: "#0d0d0d" },
  { label: "Directors",   bg: "#111111" },
  { label: "VFX",         bg: "#0f0f0f" },
  { label: "Broadcast",   bg: "#0c0c0c" },
  { label: "Originals",   bg: "#121212" },
];

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="work"
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background panels — swap on hover */}
      {categories.map((cat, i) => (
        <div
          key={cat.label}
          style={{
            position: "absolute",
            inset: 0,
            background: cat.bg,
            opacity: hovered === i ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      ))}
      {/* Default background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          opacity: hovered === null ? 1 : 0,
          transition: "opacity 0.5s ease",
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
          paddingLeft: isMobile ? 28 : 140,
          listStyle: "none",
          gap: 0,
        }}
      >
        {categories.map((cat, i) => (
          <li
            key={cat.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ lineHeight: 0.85, marginBottom: 8 }}
          >
            <a
              href={`#work-${cat.label.toLowerCase()}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 24,
                textDecoration: "none",
                fontSize: isMobile ? "clamp(2.2rem, 10vw, 3.5rem)" : "clamp(2.5rem, 6vw, 6rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: hovered === i ? "#c8a96e" : hovered !== null ? "#1c1c1c" : "#f0ede8",
                transition: "color 0.4s ease",
              }}
            >
              <span>{cat.label}</span>
              {hovered === i && (
                <svg width="32" height="32" fill="none" stroke="#c8a96e" strokeWidth={0.8} viewBox="0 0 24 24">
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
