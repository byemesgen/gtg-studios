"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  { index: "01", title: "Horizon",    category: "Commercial",     year: "2024" },
  { index: "02", title: "Meridian",   category: "Narrative Short", year: "2024" },
  { index: "03", title: "Open Road",  category: "Documentary",     year: "2023" },
  { index: "04", title: "Pulse",      category: "Music Video",     year: "2023" },
  { index: "05", title: "Watershed",  category: "Brand Film",      year: "2023" },
  { index: "06", title: "Edge",       category: "Commercial",      year: "2022" },
];

function ProjectRow({ project, i }: { project: (typeof projects)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.07 }}
      className="group border-b border-[#161616] hover:border-[#c8a96e]/20 transition-colors duration-500 cursor-pointer"
    >
      <div className="flex items-center gap-4 md:gap-8 py-6 md:py-8 px-0 group-hover:px-3 transition-all duration-500">
        {/* Number */}
        <span className="text-[#222] text-xs font-mono shrink-0 w-6 group-hover:text-[#c8a96e]/40 transition-colors duration-500">
          {project.index}
        </span>

        {/* Title */}
        <h3
          className="text-[#f0ede8] font-light group-hover:text-[#c8a96e] transition-colors duration-500 flex-1 leading-none tracking-tight"
          style={{ fontSize: "clamp(1.6rem, 4vw, 3.5rem)" }}
        >
          {project.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-6 md:gap-10 shrink-0">
          <span className="hidden sm:block text-[#444] text-xs tracking-[0.2em] uppercase">
            {project.category}
          </span>
          <span className="text-[#2e2e2e] text-xs font-mono">
            {project.year}
          </span>
          {/* Arrow */}
          <svg
            className="w-4 h-4 text-[#c8a96e] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500"
            fill="none" stroke="currentColor" strokeWidth={1}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="work" className="py-32 px-6 md:px-14">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-4 gap-4"
      >
        <p className="text-[#3a3a3a] text-[10px] tracking-[0.35em] uppercase">
          Selected Work
        </p>
        <p className="text-[#3a3a3a] text-[10px] tracking-[0.35em] uppercase">
          2022 — Present
        </p>
      </motion.div>

      {/* Top border */}
      <div className="border-t border-[#161616] mb-0" />

      {projects.map((p, i) => (
        <ProjectRow key={p.index} project={p} i={i} />
      ))}
    </section>
  );
}
