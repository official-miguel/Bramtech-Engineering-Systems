"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { Close, Menu, Phone } from "./Icons";
import { site } from "@/content/site";
import { EASE } from "./Reveal";

const nav = [
  { label: "Installation", href: "/#installation" },
  { label: "Projects", href: "/projects" },
  { label: "Hire", href: "/hire" },
  { label: "About", href: "/#about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="on-dark hidden bg-deep text-sm text-white/85 md:block">
        <div className="container-x flex items-center justify-between py-2">
          <a href={`tel:${site.phoneTel}`} className="flex items-center gap-2 font-semibold hover:text-orange">
            <Phone className="h-4 w-4" /> {site.phoneDisplay}
          </a>
          <span>Free site visit</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-sky bg-white px-4 shadow-soft transition-all duration-300 sm:px-6 ${
            scrolled ? "bg-white/85 py-1.5 shadow-lg backdrop-blur-md" : "py-2.5"
          }`}
        >
          <Link href="/" aria-label="Bramtech home" onClick={() => setOpen(false)}>
            <Logo compact={scrolled} plate={false} />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group relative rounded-full px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:text-orange-text"
              >
                {n.label}
                <span className="absolute inset-x-3.5 bottom-1 h-0.5 origin-left scale-x-0 rounded bg-orange transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/contact" event="quote_click_header" magnetic={false} className="!min-h-11 !rounded-full !py-2">
                Get a free quote
              </Button>
            </div>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-orange text-navy lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="on-dark fixed inset-0 z-[60] flex flex-col bg-deep px-6 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center text-white"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <Close className="h-7 w-7" />
            </button>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: reduce ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-heading text-4xl font-extrabold text-white hover:text-orange"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Button href="/contact" onClick={() => setOpen(false)} className="w-full" magnetic={false}>
              Get a free quote
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
