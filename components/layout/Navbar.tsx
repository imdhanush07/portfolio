"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { getNavbarSections } from "@/data/portfolioConfig";

/**
 * Tabs come from data/content.json ("sections"), edited in /admin:
 * name, order, visibility and "Navbar tab" are all controlled there.
 */
const navSections = getNavbarSections();

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Restore the saved theme when the page loads.
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const initialTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the tab of the section currently crossing the upper part of the screen.
  useEffect(() => {
    const elements = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled || open
          ? "border-b border-border-subtle bg-bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm font-medium tracking-tight text-text-primary">
          {profile.name.split(" ")[0]}
          <span className="text-accent-secondary">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={activeId === section.id ? "true" : undefined}
                className={cn(
                  "text-sm transition-colors duration-150 hover:text-text-primary",
                  activeId === section.id ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {section.navLabel}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-border-subtle p-2 text-text-primary transition-colors hover:bg-bg-elevated"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href="#contact"
            className="hidden rounded-full border border-border-subtle px-4 py-2 text-sm text-text-primary transition-colors duration-150 hover:border-accent-secondary/50 sm:inline-block"
          >
            Let&apos;s talk
          </a>
          <button
            type="button"
            className="rounded-lg border border-border-subtle p-2 text-text-primary md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="mx-auto flex max-w-6xl flex-col gap-1 px-6 pb-4 md:hidden">
          {navSections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                aria-current={activeId === section.id ? "true" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm hover:bg-bg-elevated",
                  activeId === section.id ? "text-text-primary" : "text-text-secondary"
                )}
              >
                {section.navLabel}
              </a>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}
