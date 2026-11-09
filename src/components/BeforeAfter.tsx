"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Photo } from "./Photo";
import type { Img } from "@/content/projects";

/** Before and after slider. Ready for use if the owner supplies photo pairs. */
export function BeforeAfter({ before, after, sizes = "(min-width:1024px) 50vw, 92vw" }: { before: Img; after: Img; sizes?: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);

  const set = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const down = (e: PointerEvent) => {
    drag.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    set(e.clientX);
  };
  const key = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={box}
      className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden rounded-card bg-sky"
      onPointerDown={down}
      onPointerMove={(e) => drag.current && set(e.clientX)}
      onPointerUp={() => (drag.current = false)}
    >
      <Photo img={after} sizes={sizes} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Photo img={before} sizes={sizes} />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">Before</span>
      <span className="absolute right-3 top-3 rounded-full bg-orange px-3 py-1 text-xs font-bold text-navy">After</span>
      <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }}>
        <button
          type="button"
          role="slider"
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={key}
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange text-navy shadow-lg"
        >
          <span aria-hidden className="text-lg font-bold">&harr;</span>
        </button>
      </div>
    </div>
  );
}
