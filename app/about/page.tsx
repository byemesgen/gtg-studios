"use client";

import { motion } from "framer-motion";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import Footer from "@/app/components/Footer";

const TEAM = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Founding Partner\nExecutive Creative Director",
    img: "https://picsum.photos/seed/team1/600/700",
  },
  {
    id: 2,
    name: "David Okafor",
    title: "Partner\nCreative Head of Studio",
    img: "https://picsum.photos/seed/team2/600/700",
  },
  {
    id: 3,
    name: "Rachel Torres",
    title: "Executive Producer\nManaging Director",
    img: "https://picsum.photos/seed/team3/600/700",
  },
  {
    id: 4,
    name: "James Park",
    title: "Head\nof Production",
    img: "https://picsum.photos/seed/team4/600/700",
  },
  {
    id: 5,
    name: "Lena Fischer",
    title: "VFX\n& Originals Producer",
    img: "https://picsum.photos/seed/team5/600/700",
  },
  {
    id: 6,
    name: "Marcus Reid",
    title: "Head\nof Broadcast",
    img: "https://picsum.photos/seed/team6/600/700",
  },
];

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  const { isMobile, isTablet } = useBreakpoint();

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
          ABOUT
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
          {[
            "GTG Studios is an independently owned, artist-led creative studio that loves big ideas and great people. We are at the forefront of a new wave of interdisciplinary production practice.",
            "We represent a diverse range of world-class commercial film and video directors. Our studio creates award-winning animation, motion design and VFX. Our full-service Broadcast facility cuts and finishes the biggest global formats and documentaries, and in Originals we dream up the content that we wished existed.",
            "We explore lateral solutions, using next generation technology and bespoke tools. Located in Los Angeles, our team collaborates with our global network of established and emerging talent to deliver work that moves people.",
          ].map((para, i) => (
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
          Our Team
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
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} isMobile={isMobile} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function TeamCard({
  member,
  index,
  isMobile,
}: {
  member: (typeof TEAM)[0];
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
      <img
        src={member.img}
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
          {member.title}
        </p>
      </div>
    </motion.div>
  );
}
