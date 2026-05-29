"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#AD0702", borderTop: "1px solid #8a0601" }}>
      <div
        style={{
          maxWidth: "100%",
          padding: "28px 40px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: 14,
            letterSpacing: "-0.01em",
            color: "#ffffff",
          }}
        >
          GTG Studios®
        </button>

        <p style={{ fontSize: 11, color: "rgba(0,0,0,0.5)", letterSpacing: "0.05em" }}>
          &copy; {year} GTG Studios. All rights reserved.
        </p>

        <div style={{ display: "flex", gap: 24 }}>
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
      </div>
    </footer>
  );
}
