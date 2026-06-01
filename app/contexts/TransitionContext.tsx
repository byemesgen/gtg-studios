"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Ctx = { navigate: (href: string) => void };
const TransitionContext = createContext<Ctx>({ navigate: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [exiting, setExiting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  // Reset when route actually changes
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setExiting(false);
    }
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      setExiting(true);
      // After exit curtain slides in (450ms), push the new route
      setTimeout(() => router.push(href), 450);
    },
    [router, pathname]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}

      {/* Exit curtain — slides up from the bottom when leaving a page */}
      <AnimatePresence>
        {exiting && (
          <motion.div
            key="exit-curtain"
            initial={{ scaleY: 0, transformOrigin: "bottom" }}
            animate={{ scaleY: 1, transformOrigin: "bottom" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#EB2A24",
              zIndex: 990,
              pointerEvents: "none",
            }}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
