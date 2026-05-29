"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-[#1e1e1e]" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => handleNav("#hero")}
            className="text-[#f0ede8] font-semibold text-lg tracking-widest uppercase"
          >
            GTG Studios
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="text-sm tracking-widest uppercase text-[#6b6b6b] hover:text-[#f0ede8] transition-colors duration-300"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-px w-6 bg-[#f0ede8] transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-[#f0ede8] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-[#f0ede8] transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center gap-10"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="text-3xl font-light tracking-widest uppercase text-[#f0ede8] hover:text-[#c8a96e] transition-colors duration-300"
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
