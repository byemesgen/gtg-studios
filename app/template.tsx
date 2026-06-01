"use client";

import { motion } from "framer-motion";

// template.tsx re-mounts on every route change (unlike layout.tsx which persists).
// This red curtain slides up on every page entry, revealing the content beneath.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          inset: 0,
          background: "#EB2A24",
          zIndex: 995,
          transformOrigin: "top",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
