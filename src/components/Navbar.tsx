"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check local storage or document class list
    if (document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  };

  const navLinks = [
    { name: "Why Serviq", href: "#why-serviq" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Live Demo", href: "#live-demo" },
    { name: "Meet The Team", href: "#meet-team" },
    { name: "Tech Docs", href: "#tech-docs" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 glass-container px-6 py-4 rounded-3xl transition-all duration-300 flex items-center justify-between">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <img
          src="/logo.png"
          alt="Serviq Logo"
          className="w-8 h-8 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <span className="font-heading font-black text-xl tracking-wider text-cyprus dark:text-sand">
          SERVIQ
        </span>
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-cyprus/80 dark:text-sand/80">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-cyprus dark:hover:text-teal-highlight transition-colors duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full hover:bg-cyprus/5 dark:hover:bg-sand/10 text-cyprus dark:text-sand transition-colors duration-200"
          aria-label="Toggle theme"
          id="theme-toggle-btn"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* CTA */}
        <a
          href="#live-demo"
          className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-cyprus-light text-white dark:text-cyprus-dark rounded-full font-heading font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyprus/10 dark:hover:shadow-teal-highlight/10"
          id="nav-cta-btn"
        >
          Try Demo
          <ArrowUpRight size={14} />
        </a>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 rounded-full hover:bg-cyprus/5 dark:hover:bg-sand/10 text-cyprus dark:text-sand transition-colors duration-200"
          aria-label="Toggle menu"
          id="mobile-menu-btn"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full glass-container rounded-3xl p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans font-medium text-base text-cyprus/80 dark:text-sand/80 hover:text-cyprus dark:hover:text-teal-highlight py-2 border-b border-cyprus/5 dark:border-sand/10 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#live-demo"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-1.5 px-5 py-3.5 bg-gradient-to-r from-cyprus to-cyprus-light dark:from-teal-highlight dark:to-cyprus-light text-white dark:text-cyprus-dark rounded-full font-heading font-semibold text-sm mt-2"
          >
            Try Demo
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </nav>
  );
}
