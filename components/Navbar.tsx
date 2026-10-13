"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.substring(1));
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="section-container flex items-center justify-between h-12 sm:h-16 md:h-20">
        <a
          href="#home"
          className="font-display text-base sm:text-xl md:text-2xl font-bold gradient-text hover:scale-110 transition-transform duration-300 shrink-0"
        >
          {personalInfo.name}.
        </a>

        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`group relative inline-block px-2.5 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive ? "text-yellow-600" : "text-slate-600 hover:text-yellow-600"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.8)] transition-all duration-300 ease-out ${
                      isActive ? "w-[80%] opacity-100" : "w-0 opacity-0 group-hover:w-[80%] group-hover:opacity-100"
                    }`}
                  />
                  <span className="absolute inset-0 rounded-full bg-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 sm:p-2 -mr-1 rounded-lg text-slate-700 hover:bg-yellow-50 hover:text-yellow-600 active:scale-95 transition-all duration-300"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="section-container py-2.5 space-y-1 bg-white/95 backdrop-blur-lg border-t border-slate-100">
          {navLinks.map((link) => {
            const id = link.href.substring(1);
            const isActive = activeSection === id;
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative block px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 active:translate-x-1 ${
                    isActive
                      ? "text-yellow-600 bg-yellow-50"
                      : "text-slate-700 hover:bg-yellow-50 hover:text-yellow-600"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-1 rounded-r-full bg-gradient-to-b from-yellow-400 via-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)] transition-all duration-300 ${
                      isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    }`}
                  />
                  <span className="relative z-10 pl-2">{link.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}