"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Production",
    description:
      "End-to-end film and video production — from concept development and pre-production planning through principal photography. We handle logistics, crew, locations, and everything in between so your vision makes it to camera.",
    tags: ["Pre-Production", "Principal Photography", "Location Scouting", "Casting"],
  },
  {
    number: "02",
    title: "Direction",
    description:
      "Creative direction that brings scripts and briefs to life with intention and precision. Our directors work closely with clients to develop a cinematic language that's uniquely yours.",
    tags: ["Creative Development", "Script & Storyboard", "Cinematography", "Art Direction"],
  },
  {
    number: "03",
    title: "Post-Production",
    description:
      "Full-service post: editorial, colour grading, sound design, and original score. We finish every project to broadcast and festival standard, with the detail that separates good from unforgettable.",
    tags: ["Editorial", "Colour Grading", "Sound Design", "VFX & Motion"],
  },
  {
    number: "04",
    title: "Brand Films",
    description:
      "Strategic storytelling for commercial clients. We translate brand values into narratives that resonate — from thirty-second spots to long-form documentary campaigns.",
    tags: ["Commercial", "Corporate Video", "Documentary", "Social Content"],
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group grid grid-cols-12 gap-4 py-10 border-b border-[#1e1e1e] hover:border-[#c8a96e]/30 transition-colors duration-500 cursor-default"
    >
      <div className="col-span-12 md:col-span-1">
        <span className="text-[#2e2e2e] text-sm font-mono group-hover:text-[#c8a96e]/50 transition-colors duration-500">
          {service.number}
        </span>
      </div>

      <div className="col-span-12 md:col-span-3">
        <h3 className="text-[#f0ede8] text-xl font-light group-hover:text-[#c8a96e] transition-colors duration-500">
          {service.title}
        </h3>
      </div>

      <div className="col-span-12 md:col-span-5">
        <p className="text-[#6b6b6b] text-sm leading-relaxed">{service.description}</p>
      </div>

      <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 md:justify-end content-start">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-widest uppercase text-[#3a3a3a] border border-[#1e1e1e] px-2.5 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="services" className="py-28 bg-[#0a0a0a]">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#6b6b6b] text-xs tracking-[0.3em] uppercase mb-4">
            What We Do
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-[#f0ede8] leading-tight max-w-xl">
            Full-Spectrum Production
          </h2>
        </motion.div>

        {/* Border top */}
        <div className="border-t border-[#1e1e1e]" />

        {services.map((s, i) => (
          <ServiceRow key={s.number} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
