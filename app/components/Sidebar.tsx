"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <>
      {/* Fixed 65px sidebar */}
      <aside
        style={{
          width: 65,
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99,
          background: "#0a0a0a",
          borderRight: "1px solid #181818",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 0",
        }}
      >
        {/* Burger / Logo — click to open nav */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          style={{
            width: 32,
            height: 32,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span
            style={{
              display: "block",
              width: 20,
              height: 1,
              background: open ? "#c8a96e" : "#f0ede8",
              transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: 20,
              height: 1,
              background: open ? "#c8a96e" : "#f0ede8",
              opacity: open ? 0 : 1,
              transition: "all 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: 20,
              height: 1,
              background: open ? "#c8a96e" : "#f0ede8",
              transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
              transition: "all 0.3s ease",
            }}
          />
        </button>

        {/* Vertical studio name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#f0ede8",
            fontFamily: "inherit",
            fontWeight: 500,
          }}
        >
          GTG Studios®
        </button>

        {/* Social icons */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
          <a href="#" aria-label="LinkedIn" style={{ color: "#444", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c8a96e")}
            onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram" style={{ color: "#444", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c8a96e")}
            onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
          </a>
          <a href="#" aria-label="Vimeo" style={{ color: "#444", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#c8a96e")}
            onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197a315.065 315.065 0 0 0 3.501-3.122C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z"/>
            </svg>
          </a>
        </div>
      </aside>

      {/* Nav overlay — slides in from left like Piranha Bar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 97,
                background: "rgba(0,0,0,0.6)",
              }}
            />

            {/* Panel */}
            <motion.nav
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              exit={{ clipPath: "inset(0 100% 0 0)" }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.1, 1] }}
              style={{
                position: "fixed",
                top: 0,
                left: 65,
                width: "50vw",
                height: "100vh",
                zIndex: 98,
                background: "#0f0f0f",
                borderRight: "1px solid #1a1a1a",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "60px 0 60px 80px",
                overflow: "hidden",
              }}
            >
              {/* Nav links */}
              <ul style={{ listStyle: "none", lineHeight: 0.85 }}>
                {navLinks.map((link, i) => (
                  <li key={link.href} style={{ marginBottom: 20 }}>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      onClick={() => scrollTo(link.href)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                        fontWeight: 300,
                        fontFamily: "inherit",
                        color: "#f0ede8",
                        letterSpacing: "-0.02em",
                        padding: 0,
                        transition: "color 0.3s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c8a96e")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#f0ede8")}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>

              {/* Contact info at bottom */}
              <div style={{ display: "flex", gap: 60 }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>Drop in</p>
                  <p style={{ fontSize: 13, color: "#f0ede8", lineHeight: 1.6 }}>1 Grand Canal Square<br />Dublin 2, D02 A342<br />Ireland</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>Get in touch</p>
                  <a href="tel:+35312345678" style={{ display: "block", fontSize: 13, color: "#f0ede8", textDecoration: "none", marginBottom: 6 }}>+353 1 234 5678</a>
                  <a href="mailto:hello@gtgstudios.com" style={{ display: "block", fontSize: 13, color: "#f0ede8", textDecoration: "none" }}>hello@gtgstudios.com</a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
