export default function BugBackground() {
  return (
    <svg
      viewBox="0 0 140 140"
      className="w-200 h-200 text-black/10 dark:text-white/5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Antenna */}
        <path d="M40 25 Q35 0 15 0" />
        <path d="M80 25 Q85 0 105 0" />

        {/* Head */}
        <path d="M35 30 A25 25 0 0 1 85 30" />

        {/* Body */}
        <path d="M20 30 H100 V75 Q100 100 60 120 Q20 100 20 75 Z" />

        {/* Pocket Line */}
        <path d="M40 60 L60 68 L80 60" />

        {/* Legs */}
        <path d="M10 45 L0 40" />
        <path d="M10 70 L0 75" />
        <path d="M20 95 L10 110" />

        <path d="M110 45 L120 40" />
        <path d="M110 70 L120 75" />
        <path d="M100 95 L110 110" />
      </g>
    </svg>
  );
}