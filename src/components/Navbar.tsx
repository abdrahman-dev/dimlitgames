import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { SiItchdotio } from "react-icons/si";
import { LuMoon, LuSun } from "react-icons/lu";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { site } from "../config/site";
import { cn } from "../utils/cn";
import logoSrc from "../assets/logos/logo.webp";
import type { ThemeMode } from "../types";

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const scrollY = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = scrollY > 50;

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[var(--background)]/90 backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14 md:h-16" aria-label="Main navigation">
        <a href="#hero" onClick={() => handleNavClick("#hero")} className="flex items-center gap-2">
          <img src={logoSrc} alt="Dimlit Games" className="w-6 h-6 md:w-7 md:h-7 object-contain" />
          <span className="font-title text-xs md:text-sm font-bold text-[var(--text)] hidden sm:inline">
            {site.name}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {site.nav.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="font-body text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}

          <div className="flex items-center gap-3 pl-6 border-l border-[var(--border)]">
            <a
              href={site.itchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit itch.io"
              title="itch.io"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              <SiItchdotio className="w-4 h-4" />
            </a>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub"
              title="GitHub"
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <button
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "night" ? "Dawn" : "Night"} mode`}
              className="text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-300 ml-2"
            >
              {theme === "night" ? <LuSun className="w-4 h-4" /> : <LuMoon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "night" ? "Dawn" : "Night"} mode`}
            className="text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-300"
          >
            {theme === "night" ? <LuSun className="w-4 h-4" /> : <LuMoon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="text-[var(--text)]"
          >
            {mobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {site.nav.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="font-body text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors text-left py-3.5"
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-[var(--border)]" />
              <a
                href={site.itchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-3.5"
              >
                itch.io
              </a>
              <a
                href={site.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-3.5"
              >
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
