"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Img } from "@/content/projects";
import { Photo } from "./Photo";

type Props = {
  img: Img;
  sizes: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  /** Percent travel each way. Default 8. */
  range?: number;
};

/** Image inside a fixed frame that drifts -range% to +range% as the frame crosses the viewport. */
export function ParallaxImage({ img, sizes, className = "", aspect = "aspect-[4/5]", priority, range = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-range}%`, `${range}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-card bg-sky ${aspect} ${className}`}>
      <motion.div
        className="absolute inset-x-0 -inset-y-[10%]"
        style={reduce ? undefined : { y }}
      >
        <Photo img={img} sizes={sizes} priority={priority} />
      </motion.div>
    </div>
  );
}
