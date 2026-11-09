import Image from "next/image";
import type { Img } from "@/content/projects";

type Props = {
  img: Img;
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
};

/** Fills its (positioned) parent. Parent must set size or aspect ratio so no layout shift occurs. */
export function Photo({ img, sizes, priority, className = "", alt }: Props) {
  return (
    <Image
      src={img.src}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={72}
      placeholder="blur"
      blurDataURL={img.blur}
      style={{ objectPosition: img.position }}
      className={`object-cover ${className}`}
    />
  );
}
