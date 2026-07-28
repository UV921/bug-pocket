import Link from "next/link";
import { BugPocketLogo } from "@/components/bugpocket-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AboutPage() {
  return (
    <main className="bp-shell relative px-6 py-16">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <div className="mx-auto max-w-3xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--bp-leaf)] hover:underline"
        >
          <BugPocketLogo className="size-6 text-[var(--bp-leaf)]" />
          Back to home
        </Link>
        <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight">
          About BugPocket
        </h1>
        <p className="text-lg leading-8 bp-muted">
          BugPocket is a focused bug tracker for developers who want severity,
          status, and real context in one place. Capture reproduction steps,
          snippets, and solutions — then manage every report from a personal
          dashboard and library.
        </p>
        <ul className="space-y-3 bp-muted">
          <li>• Capture bugs with severity, status, and reproduction steps</li>
          <li>• Secure sessions with JWT access and refresh cookies</li>
          <li>• Dashboard stats and a personal bug library</li>
        </ul>
      </div>
    </main>
  );
}
