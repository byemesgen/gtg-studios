"use client";

import { useIsMobile } from "@/app/hooks/useIsMobile";

export default function Footer() {
  const year = new Date().getFullYear();
  const isMobile = useIsMobile();

  const pl = isMobile ? 22 : "clamp(40px, 8vw, 100px)";
  const pr = isMobile ? 22 : "clamp(40px, 5vw, 60px)";

  return (
    <footer style={{ borderTop: "1px solid rgba(0,0,0,0.15)" }}>

      {/* ── Contact row + compass ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: isMobile ? `40px ${pr} 36px ${pl}` : `56px ${pr} 48px ${pl}`,
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        {/* Two contact columns — side by side even on mobile (matches reference) */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? 32 : "clamp(40px, 6vw, 80px)",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#000", marginBottom: 10 }}>
              Get in touch:
            </p>
            <a
              href="tel:+13105551212"
              style={{ display: "block", fontSize: isMobile ? 13 : 14, color: "rgba(0,0,0,0.65)", textDecoration: "none", lineHeight: 1.9 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.65)")}
            >
              +1 (310) 555-1212
            </a>
            <a
              href="mailto:hello@gtgstudios.com"
              style={{ display: "block", fontSize: isMobile ? 13 : 14, color: "rgba(0,0,0,0.65)", textDecoration: "none", lineHeight: 1.9 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.65)")}
            >
              hello@gtgstudios.com
            </a>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#000", marginBottom: 10 }}>
              Drop in:
            </p>
            <p style={{ fontSize: isMobile ? 13 : 14, color: "rgba(0,0,0,0.65)", lineHeight: 1.9 }}>
              Los Angeles, CA
            </p>
          </div>
        </div>

      </div>

      {/* ── Large wordmark ── */}
      <div style={{ paddingLeft: pl, paddingRight: pr, paddingBottom: 0, lineHeight: 0 }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "block",
            width: "100%",
            transition: "opacity 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          aria-label="Back to top"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/gtg-wordmark.svg"
            alt="GTG Studios"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </button>
      </div>

      {/* ── Legal strip ── */}
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.12)",
          marginTop: isMobile ? 20 : 24,
          padding: isMobile ? `12px ${pr} 12px ${pl}` : `14px ${pr} 14px ${pl}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: "rgba(0,0,0,0.38)",
            letterSpacing: "0.03em",
            lineHeight: 1.7,
            maxWidth: 560,
          }}
        >
          &copy;{year} GTG Studios. Content on this site may have been changed from the original broadcast version for display purposes. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 18 }}>
          {["Instagram", "LinkedIn", "Vimeo"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.45)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.45)")}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
