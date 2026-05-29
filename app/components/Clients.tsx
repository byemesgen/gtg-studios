"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  "Netflix", "BBC", "Nike", "Guinness",
  "Google", "Audi", "Red Bull", "Diageo",
  "Virgin Media", "Tourism Ireland", "AIB", "Three",
];

export default function Clients() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-28 px-6 md:px-14 border-t border-[#161616]">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-[#3a3a3a] text-[10px] tracking-[0.35em] uppercase mb-16"
      >
        Clients &amp; Collaborators
      </motion.p>

      <motion.div
        ref={ref}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6"
      >
        {clients.map((name, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="border border-[#111] flex items-center justify-center py-8 px-4 group hover:border-[#1e1e1e] transition-colors duration-400"
          >
            <span className="text-[#2e2e2e] text-xs tracking-[0.2em] uppercase group-hover:text-[#555] transition-colors duration-400 text-center">
              {name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
