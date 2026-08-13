"use client";

import { useEffect, useRef } from "react";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";

const DEFAULT_TEXT =
  "We are a full-service film and video production company that fuses emotion, craft and ambition to make engaging content for ambitious brands and global audiences.";

export default function AnimatedText({ text = DEFAULT_TEXT }: { text?: string }) {
  const WORDS = text.trim().split(/\s+/);
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const letters = section.querySelectorAll<HTMLSpanElement>(".letter");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          letters.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("lit");
              if (i % 7 === 3 || i % 7 === 6) el.classList.add("accent");
            }, i * 18);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const padding = isMobile
    ? "72px 22px 88px"
    : isTablet
    ? "96px 60px 120px 100px"
    : "120px 80px 160px 100px";

  const fontSize = isMobile
    ? "clamp(1.55rem, 5.8vw, 2rem)"
    : isTablet
    ? "clamp(1.8rem, 3vw, 2.6rem)"
    : "clamp(2rem, 3.2vw, 3.4rem)";

  return (
    <section ref={sectionRef} style={{ padding }}>
      <h2
        aria-label={WORDS.join(" ")}
        style={{
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: 960,
        }}
      >
        {WORDS.map((word, wi) => (
          <span
            key={wi}
            style={{ display: "inline-block", marginRight: "0.28em" }}
          >
            {word.split("").map((char, ci) => (
              <span
                key={ci}
                className="letter"
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </section>
  );
}
