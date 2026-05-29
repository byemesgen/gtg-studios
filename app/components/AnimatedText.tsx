"use client";

import { useEffect, useRef } from "react";

// Words of the tagline — each word is its own div, each letter its own span
// mirrors Piranha Bar's content_animation_text structure exactly
const WORDS = [
  "GTG", "Studios", "is", "a", "full-service",
  "film", "and", "video", "production", "company",
  "that", "fuses", "emotion,", "craft", "and",
  "ambition", "to", "make", "engaging", "content",
  "for", "ambitious", "brands", "and", "global", "audiences.",
];

// Cycle through accent/white like Piranha Bar cycles colors
const CLASSES = ["", "accent", "", "", "accent", ""];

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
              // Give some letters accent colour
              if (i % 6 === 2 || i % 6 === 5) el.classList.add("accent");
            }, i * 28);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "80px 0 220px",
        paddingLeft: 100,
        paddingRight: 70,
      }}
    >
      <h2
        aria-label={WORDS.join(" ")}
        style={{
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: "clamp(2.8rem, 6vw, 6rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        {WORDS.map((word, wi) => (
          <span
            key={wi}
            style={{ display: "inline-block", marginRight: "0.3em" }}
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
