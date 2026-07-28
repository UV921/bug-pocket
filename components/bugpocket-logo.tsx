import { cn } from "@/lib/utils";

type BugPocketLogoProps = {
  className?: string;
  /** Icon only, or icon + wordmark */
  withWordmark?: boolean;
  /** Decorative large mark for hero / backgrounds */
  decorative?: boolean;
};

/** BugPocket mark — beetle body with a pocket stitch. */
export function BugPocketLogo({
  className,
  withWordmark = false,
  decorative = false,
}: BugPocketLogoProps) {
  const mark = (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        decorative ? "h-full w-full" : "size-8 shrink-0",
        !withWordmark && className,
      )}
      aria-hidden={decorative || withWordmark}
      role={decorative || withWordmark ? undefined : "img"}
      aria-label={decorative || withWordmark ? undefined : "BugPocket"}
    >
      <title>BugPocket</title>
      {/* Soft fill body */}
      <path
        d="M18 22h28v18c0 10-8 18-14 22-6-4-14-12-14-22V22Z"
        fill="currentColor"
        fillOpacity="0.14"
      />
      {/* Antennae */}
      <path
        d="M24 18C22 10 16 6 8 5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M40 18C42 10 48 6 56 5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="5" r="2" fill="currentColor" />
      <circle cx="56" cy="5" r="2" fill="currentColor" />
      {/* Head arc */}
      <path
        d="M22 20a12 12 0 0 1 20 0"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Eyes */}
      <circle cx="28" cy="22" r="1.6" fill="currentColor" />
      <circle cx="36" cy="22" r="1.6" fill="currentColor" />
      {/* Shell outline */}
      <path
        d="M18 22h28v18c0 10-8 18-14 22-6-4-14-12-14-22V22Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Center seam */}
      <path
        d="M32 28v28"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
      {/* Pocket stitch */}
      <path
        d="M24 34c2.5 2.5 5.5 4 8 4s5.5-1.5 8-4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 38h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      {/* Legs */}
      <path
        d="M18 30H8M18 40H6M20 50l-8 8M46 30h10M46 40h12M44 50l8 8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );

  if (!withWordmark) {
    return mark;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      <span className="font-[family-name:var(--font-display),sans-serif] text-lg tracking-tight">
        BugPocket
      </span>
    </span>
  );
}

/** Large floating mark for hero backgrounds */
export function BugPocketHeroMark({ className }: { className?: string }) {
  return (
    <div className={cn("text-[var(--bp-leaf)]", className)} aria-hidden>
      <BugPocketLogo decorative className="h-full w-full opacity-30" />
    </div>
  );
}
