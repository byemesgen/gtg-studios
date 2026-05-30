"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const team = [
  {
    name: "Alex Greene",
    role: "Founder & Director",
    bio: "With over a decade directing commercials and narrative features across Europe and North America, Alex founded GTG Studios with a simple belief: every brief deserves a bold vision.",
    initials: "AG",
  },
  {
    name: "Mia Torres",
    role: "Executive Producer",
    bio: "Mia brings 12 years of production management to the table — from intimate documentary shoots to large-scale brand campaigns with crews of 100+.",
    initials: "MT",
  },
  {
    name: "Jordan Park",
    role: "Director of Photography",
    bio: "Jordan's eye for light and movement has earned recognition at festivals worldwide. His work spans fiction, documentary, and high-end commercial production.",
    initials: "JP",
  },
  {
    name: "Sam Kelly",
    role: "Head of Post-Production",
    bio: "Sam leads our post team with precision and passion — overseeing editorial, colour, sound, and VFX pipelines that consistently deliver broadcast-quality results.",
    initials: "SK",
  },
];

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group"
    >
      <div className="w-full aspect-square bg-[#111] flex items-center justify-center mb-5 group-hover:bg-[#161616] transition-colors duration-300 relative overflow-hidden">
        <span className="text-3xl text-[#2a2a2a] font-light tracking-wider group-hover:text-[#c8a96e]/20 transition-colors duration-300 select-none">
          {member.initials}
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#c8a96e]/0 group-hover:bg-[#c8a96e]/40 transition-colors duration-500" />
      </div>
      <h3 className="text-[#f0ede8] font-medium text-base">{member.name}</h3>
      <p className="text-[#c8a96e] text-xs tracking-widest uppercase mt-1 mb-3">{member.role}</p>
      <p className="text-[#6b6b6b] text-sm leading-relaxed">{member.bio}</p>
    </motion.div>
  );
}

const stats = [
  { value: "12+", label: "Years in Production" },
  { value: "200+", label: "Projects Delivered" },
  { value: "40+", label: "International Clients" },
  { value: "18", label: "Industry Awards" },
];

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-28 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24"
      >
        <div>
          <p className="text-[#6b6b6b] text-xs tracking-[0.3em] uppercase mb-4">
            About Us
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-[#f0ede8] leading-tight">
            Built for the Story
          </h2>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-[#6b6b6b] text-base leading-relaxed">
            GTG Studios was founded on the conviction that great filmmaking isn't
            a luxury — it's a competitive edge. We're a tight-knit team of
            directors, producers, and craftspeople who care deeply about the work.
            From first call to final delivery, we're your creative partners.
          </p>
          <p className="text-[#6b6b6b] text-base leading-relaxed mt-4">
            Based in Los Angeles, working worldwide.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1e1e1e] border border-[#1e1e1e] mb-24"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="bg-[#080808] px-8 py-10"
          >
            <div className="text-[clamp(2rem,4vw,3rem)] font-light text-[#c8a96e]">
              {s.value}
            </div>
            <div className="text-[#6b6b6b] text-xs tracking-widest uppercase mt-2">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Team */}
      <div>
        <p className="text-[#6b6b6b] text-xs tracking-[0.3em] uppercase mb-10">
          The Team
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
