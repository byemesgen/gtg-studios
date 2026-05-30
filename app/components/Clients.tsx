"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  "Netflix", "HBO", "Nike", "Adidas",
  "Google", "Apple", "Red Bull", "Diageo",
  "Warner Bros", "Disney", "Amazon", "Hulu",
  "Universal", "Sony", "ESPN", "NBC",
  "ABC", "Paramount",
];

export default function Clients() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        padding: isMobile ? "48px 24px 60px" : "80px 40px 80px 100px",
        borderTop: "1px solid #161616",
        background: "#080808",
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          color: "#3a3a3a",
          fontSize: 10,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          marginBottom: isMobile ? 32 : 48,
        }}
      >
        Clients &amp; Collaborators
      </motion.p>

      <motion.div
        ref={ref}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)",
        }}
      >
        {clients.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            style={{
              border: "1px solid #111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobile ? "20px 8px" : "32px 16px",
            }}
          >
            <span
              style={{
                color: "#2e2e2e",
                fontSize: isMobile ? 9 : 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "center",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#2e2e2e")}
            >
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
