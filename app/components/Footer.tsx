"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <footer style={{ background: "#EB2A24", borderTop: "1px solid #c42220" }}>
      {/* Main footer row */}
      <div
        style={{
          padding: isMobile ? "24px 20px" : "28px 40px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 20 : 16,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: isMobile ? 22 : 14,
            letterSpacing: "-0.01em",
            color: "#ffffff",
            padding: 0,
          }}
        >
          GTG Studios
        </button>

        {/* Social links */}
        <div style={{ display: "flex", gap: 24, order: isMobile ? 3 : 2 }}>
          {["Instagram", "LinkedIn", "Vimeo"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#ffffff",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
            >
              {s}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: 10,
            color: "rgba(0,0,0,0.45)",
            letterSpacing: "0.04em",
            order: isMobile ? 4 : 3,
          }}
        >
          &copy; {year} GTG Studios. All rights reserved.
        </p>
      </div>

      {/* Bottom legal strip */}
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.15)",
          padding: isMobile ? "12px 20px" : "12px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 9, color: "rgba(0,0,0,0.35)", letterSpacing: "0.04em", lineHeight: 1.6, maxWidth: 600 }}>
          Content on this site may have been changed from the original broadcast version for display purposes and is in no way intended as general consumer communication.
        </span>
        <span style={{ fontSize: 9, color: "rgba(0,0,0,0.35)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
          Los Angeles, CA · hello@gtgstudios.com
        </span>
      </div>
    </footer>
  );
}
