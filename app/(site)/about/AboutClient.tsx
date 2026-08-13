"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import Footer from "@/app/components/Footer";
import type { AboutPageData, FooterData, TeamMember } from "@/sanity/lib/queries";

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function AboutClient({
  about,
  footer,
  wordmarkUrl,
}: {
  about: AboutPageData | null;
  footer: FooterData | null;
  wordmarkUrl?: string;
}) {
  const { isMobile, isTablet } = useBreakpoint();

  const heading = about?.heading ?? "ABOUT";
  const paragraphs = about?.paragraphs ?? [];
  const teamHeading = about?.teamHeading ?? "Our Team";
  const teamMembers = about?.teamMembers ?? [];

  return (
    <main style={{ minHeight: "100vh", background: "#f0ede8", color: "#000" }}>

      {/* ── About header ── */}
      <section
        style={{
          padding: isMobile
            ? "32px 22px 48px"
            : "40px 40px 64px 100px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile
              ? "clamp(4rem, 18vw, 7rem)"
              : "clamp(4rem, 10vw, 9rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#EB2A24",
            marginBottom: isMobile ? 24 : 40,
          }}
        >
          {heading}
        </motion.h1>

        {/* Body copy */}
        <div
          style={{
            maxWidth: isMobile ? "100%" : 740,
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? 18 : 24,
          }}
        >
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: isMobile
                  ? "clamp(1rem, 4vw, 1.2rem)"
                  : "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: 1.6,
                color: "#000",
              }}
            >
              {para}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── Our Team ── */}
      <section
        style={{
          padding: isMobile
            ? "0 22px 60px"
            : "0 40px 80px 100px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: isMobile
              ? "clamp(2rem, 8vw, 3rem)"
              : "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            fontStyle: "italic",
            letterSpacing: "-0.03em",
            color: "#EB2A24",
            marginBottom: isMobile ? 24 : 36,
          }}
        >
          {teamHeading}
        </motion.h2>

        {/* Team grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : isTablet
              ? "repeat(2, 1fr)"
              : "repeat(3, 1fr)",
            gap: isMobile ? 12 : 16,
          }}
        >
          {teamMembers.map((member, i) => (
            <TeamCard key={member._key} member={member} index={i} isMobile={isMobile} />
          ))}
        </div>
      </section>

      <Footer data={footer} wordmarkUrl={wordmarkUrl} />
    </main>
  );
}

function TeamCard({
  member,
  index,
  isMobile,
}: {
  member: TeamMember;
  index: number;
  isMobile: boolean;
}) {
  return (
    <motion.div
      custom={index}
      variants={fade}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.025, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      viewport={{ once: true, margin: "-30px" }}
      style={{
        position: "relative",
        aspectRatio: "3/4",
        borderRadius: 10,
        overflow: "hidden",
        background: "#c0392b",
        cursor: "default",
      }}
    >
      {/* Photo with red duotone overlay */}
      {member.photoUrl && (
        <img
          src={`${member.photoUrl}?w=600&fit=max&auto=format`}
          alt={member.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            mixBlendMode: "luminosity",
            filter: "contrast(1.1)",
          }}
        />
      )}
      {/* Red tint overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(235,42,36,0.55)",
          mixBlendMode: "multiply",
        }}
      />
      {/* Name & title */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: isMobile ? "12px 12px" : "16px 18px",
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            fontSize: isMobile ? 13 : 15,
            color: "#fff",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginBottom: 3,
          }}
        >
          {member.name}
        </p>
        <p
          style={{
            fontSize: isMobile ? 9 : 10,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1.4,
            whiteSpace: "pre-line",
          }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}
