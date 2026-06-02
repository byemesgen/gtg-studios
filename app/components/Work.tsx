"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { usePageTransition } from "@/app/contexts/TransitionContext";

const YT_ID = "Bcpu-jqAL6w";

const categories = [
  { label: "Studio",    href: "/work?category=studio" },
  { label: "Directors", href: "/work/directors" },
  { label: "VFX",       href: "/work?category=vfx" },
  { label: "Broadcast", href: "/work?category=broadcast" },
  { label: "Originals", href: "/work?category=originals" },
];

export default function Work() {
  const [hovered, setHovered] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { navigate } = usePageTransition();

  return (
    <section
      id="work"
      style={{
        position: "relative",
        height: isMobile ? "clamp(300px, 58vh, 500px)" : "100vh",
        overflow: "hidden",
        background: "#000",
        marginLeft: isMobile ? 0 : -65,
        width: "100vw",
      }}
    >
      {/* ── YouTube iframe cover background ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "56.25vw",
          minHeight: "100%",
          minWidth: "177.78vh",
          transform: "translate(-50%, -50%) scale(1.12)",
          pointerEvents: "none",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=${YT_ID}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&fs=0`}
          allow="autoplay; fullscreen"
          allowFullScreen
          tabIndex={-1}
          style={{ width: "100%", height: "100%", border: "none", pointerEvents: "none", display: "block" }}
        />
      </div>

      {/* Color-matched blanket that hides YouTube's load-state controls.
          Fades out after 1.5 s (users scroll to this section so the video
          gets extra load time before they arrive). */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, transparent 100%)",
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
          paddingLeft: isMobile ? 22 : "clamp(105px, calc(8vw + 65px), 205px)",
          listStyle: "none",
        }}
      >
        {categories.map((cat, i) => (
          <li
            key={cat.href}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ lineHeight: 1, marginBottom: isMobile ? 4 : 6 }}
          >
            <button
              onClick={() => navigate(cat.href)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "inline-flex",
                alignItems: "center",
                gap: 18,
                position: "relative",
              }}
            >
              {/* Label with underline-wipe */}
              <span
                style={{
                  position: "relative",
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
                      ? "rgba(255,255,255,0.25)"
                      : "#ffffff",
                  transition: "color 0.35s cubic-bezier(0.22,1,0.36,1)",
                  display: "inline-block",
                  paddingBottom: isMobile ? 4 : 6,
                }}
              >
                {cat.label}

                {/* Underline wipe */}
                {!isMobile && (
                  <motion.span
                    animate={{ scaleX: hovered === i ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "#EB2A24",
                      transformOrigin: "left",
                      display: "block",
                    }}
                  />
                )}
              </span>

              {/* Arrow — slides in from left */}
              <AnimatePresence>
                {hovered === i && !isMobile && (
                  <motion.svg
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    width="28"
                    height="28"
                    fill="none"
                    stroke="#EB2A24"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    style={{ flexShrink: 0 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
