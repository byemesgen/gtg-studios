"use client";

import { useState, useEffect } from "react";

/** Returns responsive breakpoint flags, SSR-safe (defaults to desktop). */
export function useBreakpoint() {
  const [width, setWidth] = useState(1440);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return {
    isMobile:  mounted && width < 768,
    isTablet:  mounted && width >= 768 && width < 1024,
    isDesktop: !mounted || width >= 1024,
  };
}
