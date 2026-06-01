"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    if (!sessionStorage.getItem("gtg-loaded")) {
      sessionStorage.setItem("gtg-loaded", "1");
      setVisible(true);
      // Hold for 2s then fade out
      setTimeout(() => setVisible(false), 2000);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#EB2A24",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 clamp(24px, 5vw, 80px) clamp(24px, 5vh, 60px)",
            pointerEvents: "none",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(3.5rem, 10vw, 11rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 0.85,
              fontFamily: "inherit",
            }}
          >
            GTG Studios
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
