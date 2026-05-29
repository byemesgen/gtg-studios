"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Horizon",
    category: "Commercial",
    client: "Brand Campaign",
    year: "2024",
    color: "#1a1a1a",
  },
  {
    title: "Meridian",
    category: "Narrative Short",
    client: "Festival Circuit",
    year: "2024",
    color: "#141414",
  },
  {
    title: "Open Road",
    category: "Documentary",
    client: "Broadcast",
    year: "2023",
    color: "#181818",
  },
  {
    title: "Pulse",
    category: "Music Video",
    client: "Independent Artist",
    year: "2023",
    color: "#121212",
  },
  {
    title: "Watershed",
    category: "Brand Film",
    client: "Corporate",
    year: "2023",
    color: "#161616",
  },
  {
    title: "Edge",
    category: "Commercial",
    client: "Product Launch",
    year: "2022",
    color: "#111111",
  },
];

const categories = ["All", "Commercial", "Narrative", "Documentary", "Music Video"];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer"
    >
      {/* Thumbnail placeholder */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "16/9", background: project.color }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#c8a96e]/0 group-hover:bg-[#c8a96e]/5 transition-colors duration-500" />

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#2a2a2a] text-6xl font-light tracking-widest select-none">
            {project.title[0]}
          </span>
        </div>

        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full border border-[#c8a96e]/60 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#c8a96e] ml-0.5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <h3 className="text-[#f0ede8] font-medium text-base group-hover:text-[#c8a96e] transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-[#6b6b6b] text-sm mt-0.5">{project.category}</p>
        </div>
        <span className="text-[#3a3a3a] text-sm">{project.year}</span>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-28 px-6 md:px-10 max-w-7xl mx-auto">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="text-[#6b6b6b] text-xs tracking-[0.3em] uppercase mb-4">
          Selected Work
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-[#f0ede8] leading-tight">
            Our Portfolio
          </h2>
          <div className="flex flex-wrap gap-6">
            {categories.map((c) => (
              <button
                key={c}
                className="text-xs tracking-[0.2em] uppercase text-[#6b6b6b] hover:text-[#c8a96e] transition-colors duration-300 first:text-[#f0ede8]"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-16 flex justify-center"
      >
        <button className="text-sm tracking-[0.25em] uppercase text-[#6b6b6b] hover:text-[#c8a96e] transition-colors duration-300 flex items-center gap-3">
          <span>View All Projects</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
