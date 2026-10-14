"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

/**
 * Navbar: sticky morphing glass navbar
 *
 * Top of page  -> full width, transparent, soft violet glow behind it
 * After scroll -> shrinks into a floating glass pill (blur + border + glow)
 *
 * Section ids expected on the page:
 *   #about  #projects  #services  #techstack  #contact
 * Add `scroll-mt-24` to each of those sections so the fixed navbar
 * doesn't cover their headings when scrolled to.
 */

const LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Tech Stack", id: "techstack" },
  { label: "Contact", id: "contact" },
] as const;

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]";

type HireButtonProps = {
  onClick: () => void;
  className?: string;
};

function HireButton({ onClick, className = "" }: HireButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center gap-1.5 rounded-full border border-transparent bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.45)] transition-all duration-300 hover:border-[#22D3EE]/70 hover:shadow-[0_0_34px_rgba(139,92,246,0.7)] motion-reduce:transition-none ${FOCUS_RING} ${className}`}
    >
      Hire Me
      <ArrowUpRight
        size={16}
        strokeWidth={2.5}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </button>
  );
}

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // 1) Morph the navbar once the page is scrolled
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 120) setActive(""); // back on the hero: no link highlighted
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2) Scroll-spy: highlight the link of the section in view
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3) Mobile menu: lock page scroll + close on Escape
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // 4) Close the mobile menu if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (id: string) => {
      setOpen(false);
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduceMotion]
  );

  const goTop = useCallback(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex justify-center transition-[padding] duration-300 ease-out motion-reduce:transition-none ${
          scrolled ? "px-3 pt-3 md:px-4" : "px-0 pt-0"
        }`}
      >
        {/* Violet glow behind the navbar (only at the top of the page) */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(139,92,246,0.20),transparent)] transition-opacity duration-500 motion-reduce:transition-none ${
            scrolled ? "opacity-0" : "opacity-100"
          }`}
        />

        <nav
          aria-label="Primary"
          className={`relative flex w-full items-center justify-between border transition-all duration-300 ease-out motion-reduce:transition-none md:grid md:grid-cols-[1fr_auto_1fr] ${
            scrolled
              ? "max-w-[1000px] rounded-[40px] border-white/10 bg-[#0A0A12]/60 px-5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_40px_rgba(139,92,246,0.12)] backdrop-blur-xl backdrop-saturate-150"
              : "max-w-[1400px] rounded-[0px] border-transparent bg-transparent px-6 py-5 md:px-10"
          }`}
        >
          {/* Left: name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goTop();
            }}
            className={`flex items-center gap-2 justify-self-start rounded-md text-lg font-semibold tracking-tight text-[#F1F1F8] ${FOCUS_RING}`}
          >
            Abdullah Asim
          </a>

          {/* Center: links (desktop) */}
          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map(({ label, id }) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(id);
                    }}
                    className={`block rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 motion-reduce:transition-none ${FOCUS_RING} ${
                      isActive
                        ? "text-white [text-shadow:0_0_14px_rgba(34,211,238,0.85)]"
                        : "text-[#9A9AB5] hover:text-white"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right: Hire Me (desktop) + hamburger (mobile) */}
          <div className="flex items-center justify-self-end">
            <HireButton
              onClick={() => goTo("contact")}
              className="hidden md:inline-flex"
            />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#F1F1F8] md:hidden ${FOCUS_RING}`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#0A0A12]/95 px-8 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(139,92,246,0.25),transparent)]"
            />

            <ul className="relative flex flex-1 flex-col gap-2">
              {LINKS.map(({ label, id }, i) => (
                <motion.li
                  key={id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.05 * i, duration: 0.3 }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(id);
                    }}
                    className={`block rounded-xl py-3 text-3xl font-semibold tracking-tight ${FOCUS_RING} ${
                      active === id ? "text-[#22D3EE]" : "text-[#F1F1F8]"
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <HireButton
              onClick={() => goTo("contact")}
              className="relative w-full justify-center py-3.5 text-base"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}