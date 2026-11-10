import Image from "next/image";

/**
 * One component for the logo. To swap the logo, replace /public/images/logo/bramtech-logo-clear.png
 * or change `src` below. The header logo has a transparent background; the footer puts it on a light plate.
 */
export function Logo({ compact = false, plate = true, className = "" }: { compact?: boolean; plate?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-lg ${plate ? "bg-[#fbfaf7] px-2 py-1" : ""} ${className}`}>
      <Image
        src="/images/logo/bramtech-logo-clear.png"
        alt="Bramtech Engineering Systems"
        width={883}
        height={266}
        priority
        sizes="180px"
        className={`w-auto transition-[height] duration-300 ${compact ? "h-9" : "h-11"}`}
      />
    </span>
  );
}
