"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YT_ID = "pLJVdaj7K6A";

export default function Hero() {
  const [showreel, setShowreel] = useState(false);

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
        }}
        onClick={() => setShowreel(true)}
      >
        {/* Full-bleed video thumbnail */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Dark gradient at bottom so name text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(4,4,4,0.75) 0%, rgba(4,4,4,0) 50%)",
            pointerEvents: "none",
          }}
        />

        {/* MASSIVE studio name at bottom — exact same placement as Piranha Bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 30px 0 40px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            pointerEvents: "none",
            lineHeight: 0.85,
          }}
        >
          <h1
            style={{
              fontSize: "clamp(4rem, 13vw, 16rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#ffffff",
              letterSpacing: "-0.03em",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            GTG Studios
            <span style={{ color: "#c8a96e", fontSize: "0.5em", verticalAlign: "super", fontStyle: "normal" }}>®</span>
          </h1>

          {/* Circle logo mark — mirrors the Piranha Bar compass mark */}
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

        {/* Small play hint top-right */}
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
            <svg width="12" height="12" fill="white" viewBox="0 0 16 16" style={{ marginLeft: 2 }}>
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
      </section>

      {/* Lightbox */}
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
