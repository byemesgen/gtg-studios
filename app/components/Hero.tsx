"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { HeroSlide } from "@/sanity/lib/queries";

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    _key: "d1",
    company: "GTG Studios",
    projectName: "Showreel",
    videoId: "l4qXAeMAWUI",
  },
];

const SLIDE_DURATION_MS = 8000;

export default function Hero({
  slides: slideData,
  wordmarkUrl = "/gtg-wordmark.svg",
}: {
  slides?: HeroSlide[];
  wordmarkUrl?: string;
}) {
  const slides = slideData?.length ? slideData : DEFAULT_SLIDES;
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reveal the video only once YouTube confirms playback (postMessage from
  // any slide iframe). Hard fallback at 6 s covers ad-blockers / slow loads.
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

  // Auto-advance; timer restarts after a manual dot click too.
  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      SLIDE_DURATION_MS
    );
    return () => clearInterval(t);
  }, [active, slides.length]);

  const current = slides[active] ?? slides[0];

  const textBlock = (
    <>
      <p
        style={{
          fontSize: isMobile ? "clamp(0.95rem, 4vw, 1.15rem)" : "clamp(1.1rem, 1.7vw, 1.7rem)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          marginBottom: isMobile ? 6 : 10,
          lineHeight: 1,
        }}
      >
        {current.company}
      </p>
      <p
        style={{
          fontSize: isMobile ? "clamp(2.2rem, 10vw, 3.2rem)" : "clamp(2.6rem, 3.6vw, 4.6rem)",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {current.projectName}
      </p>
    </>
  );

  return (
    <>
      {/* Fixed wordmark — top right, desktop only. mix-blend difference keeps
          it visible as the page scrolls over light sections. */}
      {!isMobile && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={wordmarkUrl}
          alt="GTG Studios"
          style={{
            position: "fixed",
            top: 28,
            right: 36,
            width: "clamp(180px, 13.5vw, 300px)",
            height: "auto",
            zIndex: 60,
            pointerEvents: "none",
            filter: "brightness(0) invert(1)",
            mixBlendMode: "difference",
          }}
        />
      )}

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
        {/* ── Carousel of autoplaying YouTube backgrounds ──
            All slides stay mounted; the active one crossfades in.
            Scale trick makes each iframe behave like background-size: cover. */}
        {slides.map((slide, i) => (
          <div
            key={slide._key}
            style={{
              position: "absolute",
              inset: 0,
              opacity: i === active ? 1 : 0,
              transition: "opacity 1s ease",
              pointerEvents: "none",
            }}
          >
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
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&mute=1&controls=0&disablekb=1&loop=1&playlist=${slide.videoId}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&fs=0&enablejsapi=1`}
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
          </div>
        ))}

        {/* Blur overlay — video shows through immediately so there's no black
            screen while YouTube spins up; controls are smeared away. */}
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

        {/* Dark gradient so the text is readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(4,4,4,0.75) 0%, rgba(4,4,4,0.1) 45%, rgba(4,4,4,0.25) 100%)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />

        {/* ── Company + project name — bottom left, clickable if a URL is set ── */}
        <div
          key={current._key}
          style={{
            position: "absolute",
            left: isMobile ? 22 : "clamp(90px, 10vw, 210px)",
            bottom: isMobile ? "clamp(56px, 12vh, 110px)" : "clamp(70px, 11vh, 150px)",
            zIndex: 5,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {current.url ? (
              <a
                href={current.url}
                target={current.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block", transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {textBlock}
              </a>
            ) : (
              textBlock
            )}
          </motion.div>
        </div>

        {/* ── Carousel indicators — bottom center ── */}
        {slides.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? 20 : 36,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              zIndex: 5,
            }}
          >
            {slides.map((slide, i) => (
              <button
                key={slide._key}
                onClick={() => setActive(i)}
                aria-label={`Show ${slide.projectName}`}
                style={{
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  borderRadius: 99,
                  height: isMobile ? 5 : 6,
                  width: i === active ? (isMobile ? 40 : 60) : (isMobile ? 5 : 6),
                  background:
                    i === active ? "#ffffff" : "rgba(255,255,255,0.85)",
                  transition: "width 0.45s cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
