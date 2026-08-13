"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// ─── Portfolio data ───────────────────────────────────────────────────────────
const ITEMS = [
  { id: 1,  title: "Rise As One",              client: "Nike",         category: "studio",    tags: ["Live Action", "VFX"] },
  { id: 2,  title: "Edge of Impossible",        client: "Red Bull",     category: "studio",    tags: ["Live Action"] },
  { id: 3,  title: "The Crown — S6 Promo",      client: "Netflix",      category: "broadcast", tags: ["VFX", "Motion Design"] },
  { id: 4,  title: "Impossible Is Nothing",     client: "Adidas",       category: "studio",    tags: ["Live Action", "3D"] },
  { id: 5,  title: "Behind the Mac",            client: "Apple",        category: "studio",    tags: ["Live Action"] },
  { id: 6,  title: "Original Series Launch",    client: "HBO",          category: "broadcast", tags: ["VFX", "Animation"] },
  { id: 7,  title: "Year in Search",            client: "Google",       category: "studio",    tags: ["Live Action", "Motion Design"] },
  { id: 8,  title: "The Drive",                 client: "BMW",          category: "studio",    tags: ["Live Action", "VFX"] },
  { id: 9,  title: "Galaxy of Dreams",          client: "Disney+",      category: "originals", tags: ["3D", "Animation"] },
  { id: 10, title: "Wrapped 2024",              client: "Spotify",      category: "studio",    tags: ["2D", "Motion Design"] },
  { id: 11, title: "Prime Day Campaign",        client: "Amazon",       category: "broadcast", tags: ["VFX", "Live Action"] },
  { id: 12, title: "Electric Future",           client: "Volkswagen",   category: "studio",    tags: ["Live Action", "VFX"] },
  { id: 13, title: "Succession — Finale",       client: "HBO",          category: "broadcast", tags: ["Live Action"] },
  { id: 14, title: "Just Do It — 2024",         client: "Nike",         category: "vfx",       tags: ["VFX", "3D"] },
  { id: 15, title: "The Last of Us — S2",       client: "HBO",          category: "vfx",       tags: ["VFX", "Live Action"] },
  { id: 16, title: "Summer Originals",          client: "Amazon Prime", category: "originals", tags: ["Live Action", "Motion Design"] },
];

const CATEGORIES = [
  { key: "all",       label: "All" },
  { key: "studio",    label: "Studio" },
  { key: "vfx",       label: "VFX" },
  { key: "broadcast", label: "Broadcast" },
  { key: "originals", label: "Originals" },
];

const TAG_FILTERS = ["Animation", "3D", "Motion Design", "Character", "2D", "Live Action", "VFX", "Animotion"];

function imgSrc(id: number) {
  return `https://picsum.photos/seed/gtg${id}/800/450`;
}

// ─── Card component ───────────────────────────────────────────────────────────
function PortfolioCard({ item, isMobile }: { item: typeof ITEMS[0]; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          aspectRatio: "16/9",
          background: "#111",
        }}
      >
        {/* Thumbnail */}
        <motion.img
          src={imgSrc(item.id)}
          alt={item.title}
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Hover overlay — desktop only */}
        <AnimatePresence>
          {hovered && !isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px 22px",
              }}
            >
              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.08 }}
                style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}
              >
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      color: "#fff",
                      padding: "3px 10px",
                      borderRadius: 100,
                      fontSize: 9,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.12 }}
                style={{
                  color: "#fff",
                  fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: 5,
                }}
              >
                {item.title}
              </motion.h3>

              {/* Client */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.16 }}
                style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: 400 }}
              >
                {item.client}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile: text always visible below card */}
      {isMobile && (
        <div style={{ padding: "10px 2px 20px" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.42)",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            style={{
              fontSize: "clamp(1rem, 4vw, 1.25rem)",
              fontWeight: 700,
              color: "#000",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 3,
            }}
          >
            {item.title}
          </h3>
          <p style={{ fontSize: 13, color: "rgba(0,0,0,0.5)" }}>{item.client}</p>
        </div>
      )}
    </motion.article>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
function WorkPageInner() {
  const { isMobile } = useBreakpoint();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Sync URL param on mount
  useEffect(() => {
    setActiveCategory(searchParams.get("category") ?? "all");
  }, [searchParams]);

  const filtered = ITEMS.filter((item) => {
    const catMatch = activeCategory === "all" || item.category === activeCategory;
    const tagMatch = !activeTag || item.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
    return catMatch && tagMatch;
  });

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f0ede8",
        color: "#000",
        paddingBottom: 80,
      }}
    >
      {/* ── Fixed category filters — desktop top-right ── */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 50,
            display: "flex",
            gap: 8,
          }}
        >
          {CATEGORIES.filter((c) => c.key !== "all").map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key === activeCategory ? "all" : cat.key)}
              style={{
                background:
                  activeCategory === cat.key
                    ? "rgba(235, 42, 36, 0.12)"
                    : "rgba(240, 237, 232, 0.72)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border:
                  activeCategory === cat.key
                    ? "1px solid rgba(235,42,36,0.3)"
                    : "1px solid rgba(0,0,0,0.08)",
                borderRadius: 100,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.01em",
                cursor: "pointer",
                color: activeCategory === cat.key ? "#EB2A24" : "#000",
                fontFamily: "inherit",
                transition: "all 0.2s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Page header ── */}
      <div
        style={{
          padding: isMobile
            ? "32px 22px 24px"
            : "40px 40px 0 100px",
        }}
      >
        <h1
          style={{
            fontSize: isMobile ? "clamp(4rem, 18vw, 7rem)" : "clamp(5rem, 12vw, 10rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#EB2A24",
            marginBottom: isMobile ? 24 : 32,
          }}
        >
          WORK
        </h1>

        {/* Mobile category pills */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              gap: 8,
              overflowX: "auto",
              paddingBottom: 4,
              marginBottom: 16,
              scrollbarWidth: "none",
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  flexShrink: 0,
                  background:
                    activeCategory === cat.key
                      ? "#EB2A24"
                      : "rgba(0,0,0,0.07)",
                  border: "none",
                  borderRadius: 100,
                  padding: "7px 16px",
                  fontSize: 12,
                  fontWeight: 500,
                  color: activeCategory === cat.key ? "#fff" : "#000",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Tag filter row */}
        <div
          style={{
            display: "flex",
            flexWrap: isMobile ? "nowrap" : "wrap",
            gap: isMobile ? 6 : 10,
            overflowX: isMobile ? "auto" : "visible",
            paddingBottom: isMobile ? 4 : 0,
            scrollbarWidth: "none",
            marginBottom: isMobile ? 24 : 40,
          }}
        >
          {TAG_FILTERS.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setActiveTag((prev) => (prev === tag ? null : tag))
              }
              style={{
                flexShrink: 0,
                background: activeTag === tag ? "#000" : "transparent",
                border: "1px solid rgba(0,0,0,0.25)",
                borderRadius: 100,
                padding: isMobile ? "5px 12px" : "7px 18px",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                color: activeTag === tag ? "#f0ede8" : "#000",
                fontFamily: "inherit",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Portfolio grid ── */}
      <div
        style={{
          padding: isMobile ? "0 22px" : "0 40px 0 100px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 4 : 20,
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <PortfolioCard key={item.id} item={item} isMobile={isMobile} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p style={{ color: "rgba(0,0,0,0.3)", fontSize: 14, gridColumn: "1/-1", padding: "40px 0" }}>
            No projects match this filter.
          </p>
        )}
      </div>
    </main>
  );
}

export default function WorkPage() {
  return (
    <Suspense>
      <WorkPageInner />
    </Suspense>
  );
}
