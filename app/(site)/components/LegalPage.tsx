"use client";

import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/react";
import { useBreakpoint } from "@/app/hooks/useBreakpoint";
import Footer from "@/app/components/Footer";
import type { FooterData, LegalPageData } from "@/sanity/lib/queries";

export default function LegalPage({
  page,
  footer,
}: {
  page: LegalPageData | null;
  footer: FooterData | null;
}) {
  const { isMobile } = useBreakpoint();

  return (
    <main style={{ minHeight: "100vh", background: "#f0ede8", color: "#000" }}>
      <section
        style={{
          padding: isMobile ? "32px 22px 64px" : "40px 40px 96px 100px",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: isMobile ? "clamp(2.4rem, 11vw, 4rem)" : "clamp(3rem, 7vw, 6rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "#EB2A24",
            marginBottom: isMobile ? 28 : 48,
          }}
        >
          {page?.title ?? ""}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="legal-body"
          style={{ maxWidth: 740 }}
        >
          {page?.body && <PortableText value={page.body as PortableTextBlock[]} />}
        </motion.div>
      </section>

      <Footer data={footer} />
    </main>
  );
}
