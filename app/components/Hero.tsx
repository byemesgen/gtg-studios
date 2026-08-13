"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YT_ID = "l4qXAeMAWUI";

export default function Hero() {
  const [showreel, setShowreel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reveal the video only once YouTube confirms it is actually playing.
  // enablejsapi=1 makes YouTube broadcast playerState via postMessage.
  // Hard fallback at 6 s covers ad-blockers / slow connections.
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try {
        const d = JSON.parse(e.data);
        const playing =
          (d.event === "infoDelivery" && d.info?.playerState === 1) ||
          (d.event === "onStateChange" && d.info === 1);
        if (playing) setVideoPlaying(true);
      } catch { /* ignore non-JSON */ }
    };
    window.addEventListener("message", onMsg);
    const fallback = setTimeout(() => setVideoPlaying(true), 6000);
    return () => {
      window.removeEventListener("message", onMsg);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <section
        id="hero"
        style={{
          position: "relative",
          height: isMobile ? "calc(100vh - 55px)" : "100vh",
          overflow: "hidden",
          background: "#040404",
          // Break out of the 65px sidebar page-offset on desktop
          marginLeft: isMobile ? 0 : -65,
          width: "100vw",
        }}
      >
        {/* ── Autoplaying background video via YouTube iframe ──
            Scale trick: iframe is made larger than viewport so it
            behaves like background-size: cover regardless of aspect ratio. */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.78vh",
            transform: "translate(-50%, -50%) scale(1.12)",
            pointerEvents: "none",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=${YT_ID}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&fs=0&enablejsapi=1`}
            allow="autoplay; fullscreen"
            allowFullScreen
            tabIndex={-1}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              pointerEvents: "none",
              display: "block",
            }}
          />
        </div>

        {/* Blur overlay — video shows through immediately so there's no black
            screen, but the YouTube control icons are smeared away by the blur.
            Fades out once postMessage confirms playerState=1. */}
        <motion.div
          animate={{ opacity: videoPlaying ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

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
          onClick={() => setShowreel(true)}
          style={{
            position: "absolute",
            top: 24,
            right: 32,
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            zIndex: 10,
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

        {/* GTG wordmark — above blur overlay, reveals upward via clip-path */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isMobile ? "0 16px 16px 16px" : "0 40px 40px 105px",
            pointerEvents: "none",
            lineHeight: 0,
            zIndex: 4,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src="/gtg-wordmark.svg"
            alt="GTG Studios"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: isMobile ? "clamp(200px, 80vw, 320px)" : "clamp(320px, 55vw, 760px)",
              height: "auto",
              display: "block",
              filter: "brightness(0) invert(1)",
            }}
          />
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
