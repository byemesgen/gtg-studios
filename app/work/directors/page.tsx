"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import Footer from "@/app/components/Footer";

// ─── Directors roster ─────────────────────────────────────────────────────────
const DIRECTORS = [
  { id: 1,  name: "Alex Rivera",          img: "https://picsum.photos/seed/dir1/1920/1080" },
  { id: 2,  name: "Jordan Chen",          img: "https://picsum.photos/seed/dir2/1920/1080" },
  { id: 3,  name: "Maya Thompson",        img: "https://picsum.photos/seed/dir3/1920/1080" },
  { id: 4,  name: "Sam Okafor",           img: "https://picsum.photos/seed/dir4/1920/1080" },
  { id: 5,  name: "Elena Vasquez",        img: "https://picsum.photos/seed/dir5/1920/1080" },
  { id: 6,  name: "Marcus Bell",          img: "https://picsum.photos/seed/dir6/1920/1080" },
  { id: 7,  name: "Priya Sharma",         img: "https://picsum.photos/seed/dir7/1920/1080" },
  { id: 8,  name: "Chris Nakamura",       img: "https://picsum.photos/seed/dir8/1920/1080" },
  { id: 9,  name: "Sofia Andersen",       img: "https://picsum.photos/seed/dir9/1920/1080" },
  { id: 10, name: "Daniel Wright",        img: "https://picsum.photos/seed/dir10/1920/1080" },
  { id: 11, name: "Aisha Koroma",         img: "https://picsum.photos/seed/dir11/1920/1080" },
  { id: 12, name: "Liam Fitzgerald",      img: "https://picsum.photos/seed/dir12/1920/1080" },
  { id: 13, name: "Natasha Volkov",       img: "https://picsum.photos/seed/dir13/1920/1080" },
  { id: 14, name: "James Osei",           img: "https://picsum.photos/seed/dir14/1920/1080" },
];

export default function DirectorsPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const isHovering = hovered !== null;

  // Split into 2 columns
  const col1 = DIRECTORS.filter((_, i) => i % 2 === 0);
  const col2 = DIRECTORS.filter((_, i) => i % 2 === 1);

  return (
    <main style={{ minHeight: "100vh", background: "#f0ede8", color: "#000" }}>

      {/* ── Directors hero section ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          background: isHovering ? "#000" : "#f0ede8",
          transition: "background 0.4s ease",
        }}
      >
        {/* Background images — one per director, crossfade on hover */}
        {DIRECTORS.map((dir) => (
          <AnimatePresence key={dir.id}>
            {hovered === dir.id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${dir.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 0,
                }}
              />
            )}
          </AnimatePresence>
        ))}

        {/* Dark overlay — appears when hovering */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.4s ease",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            padding: isMobile
              ? "32px 22px 40px"
              : "40px 40px 60px 100px",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: isMobile ? 32 : 56 }}>
            <h1
              style={{
                fontSize: isMobile
                  ? "clamp(4rem, 18vw, 7rem)"
                  : "clamp(4rem, 10vw, 9rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: isHovering ? "#ffffff" : "#EB2A24",
                transition: "color 0.4s ease",
                marginBottom: isMobile ? 16 : 24,
              }}
            >
              DIRECTORS
            </h1>
            <p
              style={{
                fontSize: isMobile ? 14 : "clamp(14px, 1.4vw, 18px)",
                lineHeight: 1.55,
                color: isHovering ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                maxWidth: 560,
                transition: "color 0.4s ease",
              }}
            >
              Presenting a diverse and unique roster of talent — with a commitment
              to craft, culture and storytelling. Established and emerging voices
              from Los Angeles and beyond.
            </p>
          </div>

          {/* Names grid */}
          {isMobile ? (
            /* Mobile: single column */
            <ul style={{ listStyle: "none", flex: 1 }}>
              {DIRECTORS.map((dir) => (
                <DirectorItem
                  key={dir.id}
                  dir={dir}
                  isHovering={isHovering}
                  isActive={hovered === dir.id}
                  onEnter={() => setHovered(dir.id)}
                  onLeave={() => setHovered(null)}
                  isMobile={isMobile}
                />
              ))}
            </ul>
          ) : (
            /* Desktop: 2 columns */
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                flex: 1,
                alignContent: "start",
                gap: "0 40px",
              }}
            >
              {col1.map((dir, i) => (
                <DirectorItem
                  key={dir.id}
                  dir={dir}
                  isHovering={isHovering}
                  isActive={hovered === dir.id}
                  onEnter={() => setHovered(dir.id)}
                  onLeave={() => setHovered(null)}
                  isMobile={false}
                  paired={col2[i]}
                  pairedIsActive={hovered === col2[i]?.id}
                  onPairedEnter={() => col2[i] && setHovered(col2[i].id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

// ─── Single director row (desktop: renders both columns in one row) ────────────
function DirectorItem({
  dir,
  isHovering,
  isActive,
  onEnter,
  onLeave,
  isMobile,
  paired,
  pairedIsActive,
  onPairedEnter,
}: {
  dir: (typeof DIRECTORS)[0];
  isHovering: boolean;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isMobile: boolean;
  paired?: (typeof DIRECTORS)[0];
  pairedIsActive?: boolean;
  onPairedEnter?: () => void;
}) {
  const nameStyle = (active: boolean): React.CSSProperties => ({
    fontSize: isMobile ? "clamp(1.6rem, 7vw, 2.4rem)" : "clamp(1.4rem, 2.8vw, 3rem)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1,
    cursor: "pointer",
    padding: isMobile ? "12px 0" : "14px 0",
    display: "block",
    transition: "color 0.3s ease, opacity 0.3s ease",
    color: isHovering
      ? active
        ? "#ffffff"
        : "rgba(255,255,255,0.22)"
      : "#000000",
    borderBottom: `1px solid ${
      isHovering ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"
    }`,
    userSelect: "none",
  });

  if (isMobile) {
    return (
      <li>
        <span
          style={nameStyle(isActive)}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {dir.name}
        </span>
      </li>
    );
  }

  // Desktop: each grid item renders the left name only; the right (paired) is
  // handled by the sibling. We put both in the same grid row by rendering
  // a two-column wrapper.
  return (
    <>
      <span
        style={nameStyle(isActive)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {dir.name}
      </span>
      {paired ? (
        <span
          style={nameStyle(!!pairedIsActive)}
          onMouseEnter={onPairedEnter}
          onMouseLeave={onLeave}
        >
          {paired.name}
        </span>
      ) : (
        <span />
      )}
    </>
  );
}
