"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 bg-[#0a0a0a]">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[#6b6b6b] text-xs tracking-[0.3em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-light text-[#f0ede8] leading-tight max-w-2xl">
            Let's make something remarkable together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="py-20 text-center">
                <div className="w-12 h-12 rounded-full border border-[#c8a96e] flex items-center justify-center mx-auto mb-6">
                  <svg className="w-5 h-5 text-[#c8a96e]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-[#f0ede8] text-xl font-light mb-2">Message received</h3>
                <p className="text-[#6b6b6b] text-sm">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c8a96e] text-[#f0ede8] text-sm py-3 outline-none transition-colors duration-300 placeholder:text-[#3a3a3a]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c8a96e] text-[#f0ede8] text-sm py-3 outline-none transition-colors duration-300 placeholder:text-[#3a3a3a]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-2">
                    Project Type
                  </label>
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border-b border-[#2e2e2e] focus:border-[#c8a96e] text-[#f0ede8] text-sm py-3 outline-none transition-colors duration-300 cursor-pointer"
                  >
                    <option value="" className="bg-[#0f0f0f]">Select a service</option>
                    <option value="commercial" className="bg-[#0f0f0f]">Commercial / Brand Film</option>
                    <option value="narrative" className="bg-[#0f0f0f]">Narrative / Fiction</option>
                    <option value="documentary" className="bg-[#0f0f0f]">Documentary</option>
                    <option value="music-video" className="bg-[#0f0f0f]">Music Video</option>
                    <option value="corporate" className="bg-[#0f0f0f]">Corporate Video</option>
                    <option value="other" className="bg-[#0f0f0f]">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-2">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#c8a96e] text-[#f0ede8] text-sm py-3 outline-none transition-colors duration-300 resize-none placeholder:text-[#3a3a3a]"
                    placeholder="Brief outline, timeline, budget range..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-10 py-4 bg-[#c8a96e] text-[#080808] text-sm tracking-widest uppercase font-medium hover:bg-[#d4b87a] transition-colors duration-300 mt-2"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-10"
          >
            <div>
              <p className="text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-3">Email</p>
              <a
                href="mailto:hello@gtgstudios.com"
                className="text-[#f0ede8] text-sm hover:text-[#c8a96e] transition-colors duration-300"
              >
                hello@gtgstudios.com
              </a>
            </div>

            <div>
              <p className="text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-3">Phone</p>
              <a
                href="tel:+35312345678"
                className="text-[#f0ede8] text-sm hover:text-[#c8a96e] transition-colors duration-300"
              >
                +353 1 234 5678
              </a>
            </div>

            <div>
              <p className="text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-3">Studio</p>
              <address className="text-[#f0ede8] text-sm not-italic leading-relaxed">
                GTG Studios<br />
                1 Grand Canal Square<br />
                Dublin 2, D02 A342<br />
                Ireland
              </address>
            </div>

            <div>
              <p className="text-[#6b6b6b] text-xs tracking-[0.2em] uppercase mb-3">Follow</p>
              <div className="flex gap-6">
                {["Instagram", "LinkedIn", "Vimeo"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-[#f0ede8] text-sm hover:text-[#c8a96e] transition-colors duration-300"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
