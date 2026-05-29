"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1e1e1e] py-8 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <button
          onClick={scrollToTop}
          className="text-[#f0ede8] font-semibold text-sm tracking-widest uppercase hover:text-[#c8a96e] transition-colors duration-300"
        >
          GTG Studios
        </button>

        <p className="text-[#3a3a3a] text-xs tracking-wider text-center">
          &copy; {year} GTG Studios. All rights reserved.
        </p>

        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Vimeo"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-[#3a3a3a] text-xs tracking-widest uppercase hover:text-[#c8a96e] transition-colors duration-300"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
