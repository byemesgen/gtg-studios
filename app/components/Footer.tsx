"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,0,0,0.15)",
        paddingLeft: "clamp(28px, 8vw, 100px)",
      }}
    >
      {/* ── Top: contact columns + compass mark ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "56px clamp(28px, 5vw, 60px) 48px 0",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {/* Contact columns */}
        <div style={{ display: "flex", gap: "clamp(36px, 6vw, 80px)", flexWrap: "wrap" }}>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#000",
                marginBottom: 10,
              }}
            >
              Get in touch:
            </p>
            <a
              href="tel:+13105551212"
              style={{
                display: "block",
                fontSize: 14,
                color: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                lineHeight: 1.8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.7)")}
            >
              +1 (310) 555-1212
            </a>
            <a
              href="mailto:hello@gtgstudios.com"
              style={{
                display: "block",
                fontSize: 14,
                color: "rgba(0,0,0,0.7)",
                textDecoration: "none",
                lineHeight: 1.8,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.7)")}
            >
              hello@gtgstudios.com
            </a>
          </div>

          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#000",
                marginBottom: 10,
              }}
            >
              Drop in:
            </p>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", lineHeight: 1.8 }}>
              Los Angeles, CA
            </p>
          </div>
        </div>

        {/* Compass / logo mark */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          style={{ width: "clamp(64px, 8vw, 120px)", height: "clamp(64px, 8vw, 120px)", flexShrink: 0 }}
        >
          <circle cx="50" cy="50" r="46" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="36" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
          <path
            d="M50 8 L53.5 44 L92 50 L53.5 56 L50 92 L46.5 56 L8 50 L46.5 44 Z"
            fill="rgba(0,0,0,0.6)"
          />
        </svg>
      </div>

      {/* ── Large wordmark ── */}
      <div style={{ paddingRight: "clamp(28px, 5vw, 60px)", paddingBottom: 0 }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(4rem, 14vw, 17rem)",
            letterSpacing: "-0.03em",
            color: "#000",
            lineHeight: 0.88,
            padding: 0,
            display: "block",
            width: "100%",
            textAlign: "left",
            transition: "opacity 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          GTG Studios
        </button>
      </div>

      {/* ── Bottom strip ── */}
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.12)",
          marginTop: 24,
          padding: "14px clamp(28px, 5vw, 60px) 14px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 9, color: "rgba(0,0,0,0.4)", letterSpacing: "0.04em", lineHeight: 1.6, maxWidth: 560 }}>
          &copy;{year} GTG Studios. Content on this site may have been changed from the original broadcast version for display purposes and is in no way intended as general consumer communication. All rights reserved.
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Instagram", "LinkedIn", "Vimeo"].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontSize: 9,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.5)",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.5)")}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
