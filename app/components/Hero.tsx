"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YT_ID = "pLJVdaj7K6A";

export default function Hero() {
  const [showreel, setShowreel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <section
        id="hero"
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          background: "#040404",
          cursor: "pointer",
          // Break out of the 65px sidebar page-offset on desktop
          marginLeft: isMobile ? 0 : -65,
          width: "100vw",
        }}
        onClick={() => setShowreel(true)}
      >
        {/* ── Autoplaying background video via YouTube iframe ──
            Scale trick: iframe is made larger than viewport so it
            behaves like background-size: cover regardless of aspect ratio. */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            /* Cover trick: iframe sized to fill both axes.
               scale(1.12) crops YouTube's own letterbox padding on every edge. */
            width: "100vw",
            height: "56.25vw",    /* 16/9 of viewport width */
            minHeight: "100vh",
            minWidth: "177.78vh", /* 16/9 of viewport height */
            transform: "translate(-50%, -50%) scale(1.12)",
            pointerEvents: "none",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YT_ID}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Dark gradient overlay so text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(4,4,4,0.8) 0%, rgba(4,4,4,0.15) 50%, rgba(4,4,4,0.3) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Small play hint — top right */}
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            display: "flex",
            alignItems: "center",
            gap: 10,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="12"
              height="12"
              fill="white"
              viewBox="0 0 16 16"
              style={{ marginLeft: 2 }}
            >
              <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "inherit",
            }}
          >
            Play Showreel
          </span>
        </div>

        {/* MASSIVE studio name overlay — bottom of hero */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isMobile ? "0 16px 0 16px" : "0 30px 0 40px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            pointerEvents: "none",
            lineHeight: 0.85,
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "clamp(2.8rem, 14vw, 5rem)" : "clamp(4rem, 13vw, 16rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#ffffff",
              letterSpacing: "-0.03em",
              fontFamily: "inherit",
              whiteSpace: isMobile ? "normal" : "nowrap",
            }}
          >
            GTG Studios
          </h1>

          {/* Circle compass mark — mirrors Piranha Bar logo mark */}
          <div
            style={{
              width: "clamp(48px, 7vw, 110px)",
              height: "clamp(48px, 7vw, 110px)",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginBottom: "clamp(8px, 2vw, 24px)",
            }}
          >
            <svg
              viewBox="0 0 40 40"
              fill="white"
              style={{ width: "55%", height: "55%" }}
            >
              <path d="M20 2 L22.5 17.5 L38 20 L22.5 22.5 L20 38 L17.5 22.5 L2 20 L17.5 17.5 Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Lightbox — full audio/controls version ── */}
      <AnimatePresence>
        {showreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowreel(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 1000,
                aspectRatio: "16/9",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                allow="autoplay; fullscreen"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: "none" }}
              />
              <button
                onClick={() => setShowreel(false)}
                style={{
                  position: "absolute",
                  top: -36,
                  right: 0,
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
