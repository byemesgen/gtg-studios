"use client";

import { useEffect, useRef } from "react";

const WORDS = [
  "We", "are", "a", "full-service",
  "film", "and", "video", "production",
  "company", "that", "fuses", "emotion,",
  "craft", "and", "ambition", "to",
  "make", "engaging", "content", "for",
  "ambitious", "brands", "and", "global", "audiences.",
];

export default function AnimatedText() {
  const sectionRef = useRef<HTMLElement>(null);

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
            }, i * 22);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#ffffff",
        padding: "80px 80px 120px 100px",
      }}
    >
      <h2
        aria-label={WORDS.join(" ")}
        style={{
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: "clamp(1.9rem, 3.2vw, 3.4rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          maxWidth: 900,
        }}
      >
        {WORDS.map((word, wi) => (
          <span key={wi} style={{ display: "inline-block", marginRight: "0.28em" }}>
            {word.split("").map((char, ci) => (
              <span key={ci} className="letter" style={{ display: "inline-block" }}>
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </section>
  );
}
