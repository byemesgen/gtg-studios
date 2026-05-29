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
        }}
      >
        {/* YouTube thumbnail as background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.45)",
          }}
        />

        {/* Centered play button */}
        <button
          onClick={() => setShowreel(true)}
          aria-label="Play Showreel"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            gap: 20,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "1px solid rgba(200,169,110,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" fill="#c8a96e" viewBox="0 0 16 16" style={{ marginLeft: 3 }}>
              <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          </motion.div>
          <span style={{
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.6)",
            fontFamily: "inherit",
          }}>
            Play Showreel
          </span>
        </button>

        {/* Bottom overlay — studio name */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "40px 70px",
            background: "linear-gradient(to top, rgba(4,4,4,0.9) 0%, transparent 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <p style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.4)",
          }}>
            Film · Video · Production
          </p>
          <p style={{
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.4)",
          }}>
            Dublin · Worldwide
          </p>
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
              padding: "40px",
            }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "100%", maxWidth: 1000, aspectRatio: "16/9" }}
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
                  color: "rgba(240,237,232,0.5)",
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
