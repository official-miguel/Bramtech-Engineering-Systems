"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Chevron, Close } from "./Icons";
import type { Project } from "@/content/projects";
import { isSet } from "@/content/site";

type Props = {
  items: Project[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
  layoutPrefix: string;
};

/** Full-screen viewer. Shared-element transition from the thumbnail, focus trap, keys and swipe. */
export function Lightbox({ items, index, onClose, onIndex, layoutPrefix }: Props) {
  const reduce = useReducedMotion();
  const p = items[index];
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const prev = useRef<Element | null>(null);

  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    prev.current = document.activeElement;
    closeBtn.current?.focus();
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      (prev.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("button, a[href]");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const ratio = p.width / p.height;

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${p.title}, image ${index + 1} of ${items.length}`}
      className="on-dark fixed inset-0 z-[80] flex items-center justify-center bg-deep/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        ref={closeBtn}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <Close className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
      >
        <Chevron dir="left" className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next image"
        className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
      >
        <Chevron className="h-6 w-6" />
      </button>

      <motion.figure
        key={p.id}
        layoutId={reduce ? undefined : `${layoutPrefix}-${p.id}`}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={(_, info) => {
          if (info.offset.x < -70) go(1);
          else if (info.offset.x > 70) go(-1);
        }}
        className="relative m-0 touch-pan-y"
        style={{
          aspectRatio: String(ratio),
          width: `min(92vw, calc(78vh * ${ratio}))`,
        }}
      >
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes="92vw"
          placeholder="blur"
          blurDataURL={p.blur}
          className="rounded-card object-contain"
          draggable={false}
        />
        <figcaption className="absolute inset-x-0 -bottom-12 text-center text-sm text-white/80">
          <span className="font-bold text-white">{p.title}</span> · {p.category}
          {isSet(p.location) && ` · ${p.location}`}
          {isSet(p.year) && `, ${p.year}`}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
