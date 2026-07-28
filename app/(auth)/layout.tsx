import Link from "next/link";
import BugBackground from "../component/buglogo";
import { BugPocketLogo } from "@/components/bugpocket-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bp-shell relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div className="absolute right-6 top-6 z-30">
        <ThemeToggle />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[var(--bp-leaf)]/15">
        <BugBackground />
      </div>

      <Link
        href="/"
        className="relative z-20 mb-8 transition hover:text-[var(--bp-leaf)]"
      >
        <BugPocketLogo withWordmark />
      </Link>

      <div className="relative z-20 w-full max-w-md">{children}</div>
    </div>
  );
}
