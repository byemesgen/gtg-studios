"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RED = "#EB2A24";
const RED_BORDER = "#c42220";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close menu on scroll (better mobile UX)
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  return (
    <>
      {/*
        DESKTOP: fixed 65px left sidebar
        MOBILE:  fixed 55px top bar (full width)
      */}
      <aside
        style={{
          position: "fixed",
          zIndex: 99,
          background: RED,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ...(isMobile
            ? {
                top: 0, left: 0,
                width: "100%", height: 55,
                flexDirection: "row",
                padding: "0 20px",
                borderBottom: `1px solid ${RED_BORDER}`,
              }
            : {
                top: 0, left: 0,
                width: 65, height: "100vh",
                flexDirection: "column",
                padding: "22px 0",
                borderRight: `1px solid ${RED_BORDER}`,
              }),
        }}
      >
        {/* Studio name — bold italic on mobile, vertical small-caps on desktop */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            color: "#ffffff",
            ...(isMobile
              ? {
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: 16,
                  letterSpacing: "-0.01em",
                  order: 1,
                }
              : {
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "#f0ede8",
                  order: 2,
                }),
          }}
        >
          GTG Studios
        </button>

        {/* Burger icon */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            order: isMobile ? 2 : 1,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#ffffff",
                transformOrigin: "center",
                transform:
                  i === 0 && open
                    ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 2 && open
                    ? "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "none",
                opacity: i === 1 && open ? 0 : 1,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </button>

        {/* Social icons — desktop only */}
        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, order: 3 }}>
            {[
              {
                label: "Li",
                svg: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                ),
              },
              {
                label: "Ig",
                svg: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                ),
              },
              {
                label: "Vi",
                svg: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 0 0 3.501-3.122C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z" />
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href="#"
                style={{ color: "#ffffff", transition: "color 0.3s", lineHeight: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                aria-label={s.label}
              >
                {s.svg}
              </a>
            ))}
          </div>
        )}
      </aside>

      {/* ── Nav overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 97,
                background: "rgba(0,0,0,0.5)",
              }}
            />

            {/* Nav panel — full-width on mobile, 50vw on desktop */}
            <motion.nav
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.1, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: isMobile ? 0 : 65,
                width: isMobile ? "100vw" : "min(480px, 85vw)",
                height: "100vh",
                zIndex: 98,
                background: RED,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: isMobile ? "20px 0 40px 36px" : "28px 0 48px 70px",
                overflow: "hidden",
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#000000",
                  fontSize: 22,
                  fontFamily: "inherit",
                  fontWeight: 300,
                  lineHeight: 1,
                  alignSelf: "flex-start",
                  padding: 0,
                  marginBottom: 16,
                }}
              >
                ×
              </button>

              {/* Nav links */}
              <ul
                style={{
                  listStyle: "none",
                  lineHeight: 0.85,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 0,
                }}
              >
                <NavItem
                  label="HOME"
                  onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  bold delay={0.05}
                />
                <NavItem label="WORK" onClick={() => scrollTo("#work")} bold delay={0.1} />
                <SubItem label="Studio"     onClick={() => scrollTo("#work")} delay={0.13} />
                <SubItem label="Directors"  onClick={() => scrollTo("#work")} delay={0.15} />
                <SubItem label="VFX"        onClick={() => scrollTo("#work")} delay={0.17} />
                <SubItem label="Broadcast"  onClick={() => scrollTo("#work")} delay={0.19} />
                <NavItem label="SERVICES"   onClick={() => scrollTo("#services")} bold delay={0.22} />
                <NavItem label="ABOUT"      onClick={() => scrollTo("#about")}    bold delay={0.26} />
                <NavItem label="CONTACT"    onClick={() => scrollTo("#contact")}  bold delay={0.3} />
              </ul>

              {/* Contact info — bottom of panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ display: "flex", gap: 36, paddingRight: 32, flexWrap: "wrap" }}
              >
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#000000", marginBottom: 6 }}>Drop in:</p>
                  <p style={{ fontSize: 12, color: "rgba(0,0,0,0.6)", lineHeight: 1.7 }}>
                    Los Angeles, CA
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#000000", marginBottom: 6 }}>Get in touch:</p>
                  <a
                    href="tel:+13105551212"
                    style={{ display: "block", fontSize: 12, color: "rgba(0,0,0,0.6)", textDecoration: "none", lineHeight: 1.7 }}
                  >
                    +1 (310) 555-1212
                  </a>
                  <a
                    href="mailto:hello@gtgstudios.com"
                    style={{ display: "block", fontSize: 12, color: "rgba(0,0,0,0.6)", textDecoration: "none" }}
                  >
                    hello@gtgstudios.com
                  </a>
                </div>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({
  label, onClick, bold, delay,
}: {
  label: string; onClick: () => void; bold?: boolean; delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{ marginBottom: bold ? 4 : 0 }}
    >
      <button
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "clamp(2rem, 4.5vw, 5rem)",
          fontWeight: bold ? 700 : 400,
          fontFamily: "inherit",
          color: "#000000",
          letterSpacing: bold ? "-0.02em" : "-0.01em",
          padding: "2px 0",
          lineHeight: 1,
          transition: "color 0.25s",
          textTransform: bold ? "uppercase" : "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
      >
        {label}
      </button>
    </motion.li>
  );
}

function SubItem({
  label, onClick, delay,
}: {
  label: string; onClick: () => void; delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.35 }}
      style={{ paddingLeft: 24, marginBottom: 0 }}
    >
      <button
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "clamp(1.4rem, 3vw, 3rem)",
          fontWeight: 300,
          fontFamily: "inherit",
          color: "rgba(0,0,0,0.55)",
          letterSpacing: "-0.01em",
          padding: "1px 0",
          lineHeight: 1.1,
          transition: "color 0.25s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}
      >
        {label}
      </button>
    </motion.li>
  );
}
