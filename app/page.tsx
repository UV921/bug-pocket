import Link from "next/link";
import {
  BugPocketHeroMark,
  BugPocketLogo,
} from "@/components/bugpocket-logo";
import { ThemeToggle } from "@/components/theme-toggle";

/*
 * ============================================================================
 * BugPocket — landing product surface
 * ============================================================================
 * Feature roadmap (keep comments in sync with the product):
 *
 * AUTHENTICATION
 * - Signup / login with Zod + hashed passwords
 * - JWT access + refresh tokens in HttpOnly cookies
 * - Protected routes via proxy.ts
 * - Logout clears cookies + refresh-token rows
 *
 * BUG MANAGEMENT (CRUD)
 * - Create (/library/new), list (/library), update/delete (/library/[id])
 * - REST: GET/POST /api/bugs, GET/PATCH/DELETE /api/bugs/[id]
 *
 * BUG FIELDS & TRACKING
 * - Title, description, reproduction steps
 * - Severity: LOW | MEDIUM | HIGH | CRITICAL
 * - Status: OPEN | IN_PROGRESS | RESOLVED | CLOSED
 * - Environment, attachment name, reference URL
 * - Code language + snippet, proposed solution
 *
 * DASHBOARD / LIBRARY / PROFILE
 * - Stats + recent bugs, full library listing, account summary
 *
 * FUTURE
 * - Real file uploads, search/filters, teams, status emails
 * ============================================================================
 */

const howItWorks = [
  {
    step: "01",
    title: "Capture the bug",
    body: "Log what broke, how to reproduce it, and how severe it is — before context fades.",
  },
  {
    step: "02",
    title: "Triage with clarity",
    body: "Use severity and status to decide what to fix now, what to watch, and what is done.",
  },
  {
    step: "03",
    title: "Keep the trail",
    body: "Snippets, environment notes, and solutions stay with the report so the next fix is faster.",
  },
];

const capabilities = [
  {
    title: "Secure accounts",
    body: "Sign up and log in with protected sessions. Access and refresh tokens live in HttpOnly cookies so private pages stay private.",
  },
  {
    title: "Full issue lifecycle",
    body: "Create, open, update, and delete reports from the library — or drive the same CRUD through the bugs API.",
  },
  {
    title: "Severity that means something",
    body: "Mark issues LOW, MEDIUM, HIGH, or CRITICAL so the urgent ones never hide under noise.",
  },
  {
    title: "Status you can trust",
    body: "Move every report through OPEN, IN PROGRESS, RESOLVED, and CLOSED as work actually progresses.",
  },
  {
    title: "Dashboard at a glance",
    body: "See total bugs, open counts, critical pressure, and your five most recent reports the moment you sign in.",
  },
  {
    title: "A personal library",
    body: "Browse every report you own with severity and status chips — then open any item to edit the full record.",
  },
];

const reportFields = [
  {
    title: "Core story",
    items: ["Title", "Description", "Reproduction steps"],
  },
  {
    title: "Priority signals",
    items: ["Severity level", "Workflow status", "Environment notes"],
  },
  {
    title: "Developer context",
    items: ["Code language", "Code snippet", "Proposed solution"],
  },
  {
    title: "Extra evidence",
    items: ["Attachment name", "Reference link", "Timestamps"],
  },
];

const surfaces = [
  {
    name: "Dashboard",
    detail:
      "Totals, open bugs, critical counts, and a short list of what changed most recently.",
  },
  {
    name: "Library",
    detail:
      "Every report you own, scannable by severity and status, with a full editor on each item.",
  },
  {
    name: "Profile",
    detail:
      "Your account snapshot — username, email, join date, and how many bugs you have pocketed.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-[var(--bp-text)]">
      {/* Full-bleed hero — brand first, one composition */}
      <div className="relative isolate min-h-[100svh] overflow-hidden">
        <div aria-hidden className="bp-hero-bg pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(var(--bp-hero-grid)_1px,transparent_1px),linear-gradient(90deg,var(--bp-hero-grid)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_72%)]"
        />
        <BugPocketHeroMark className="bp-float pointer-events-none absolute -right-10 top-16 h-[22rem] w-[22rem] md:right-6 md:top-20 md:h-[34rem] md:w-[34rem]" />

        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link href="/" className="transition hover:text-[var(--bp-leaf)]">
            <BugPocketLogo withWordmark />
          </Link>
          <nav className="flex items-center gap-4 text-sm text-[var(--bp-mist)]">
            <ThemeToggle />
            <a
              href="#how"
              className="hidden transition hover:text-[var(--bp-leaf)] sm:inline"
            >
              How it works
            </a>
            <a
              href="#features"
              className="hidden transition hover:text-[var(--bp-leaf)] sm:inline"
            >
              Features
            </a>
            <Link href="/login" className="transition hover:text-[var(--bp-leaf)]">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[var(--bp-leaf)] px-3 py-1.5 font-medium text-[var(--bp-ink)] transition hover:bg-[var(--bp-amber)]"
            >
              Sign up
            </Link>
          </nav>
        </header>

        <section className="relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-6 pb-28 pt-20 md:min-h-[78svh] md:pt-8">
          <div className="mb-8">
            <BugPocketLogo className="size-16 text-[var(--bp-leaf)] md:size-20" />
          </div>
          <p className="font-[family-name:var(--font-display)] text-6xl leading-[0.92] tracking-tight sm:text-7xl md:text-8xl">
            BugPocket
          </p>
          <h1 className="mt-7 max-w-xl text-2xl leading-snug text-[var(--bp-mist)] sm:text-3xl">
            Pocket every bug before it slips into production.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-[var(--bp-mist)]/85">
            A focused issue tracker for severity, status, reproduction steps,
            and the context that actually helps you ship the fix.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-[var(--bp-leaf)] px-6 py-3 text-sm font-semibold text-[var(--bp-ink)] transition hover:bg-[var(--bp-amber)]"
            >
              Start pocketing bugs
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-[var(--bp-line)] px-6 py-3 text-sm font-medium transition hover:border-[var(--bp-leaf)] hover:text-[var(--bp-leaf)]"
            >
              I already have an account
            </Link>
          </div>
        </section>
      </div>

      <section
        id="how"
        className="scroll-mt-8 border-t border-[var(--bp-line)] bg-[var(--bp-panel-2)] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl">
            From sighting to solved
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--bp-mist)]">
            BugPocket is built around a simple loop: capture the failure, rank
            it honestly, and keep every useful detail beside the report.
          </p>
          <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {howItWorks.map((item) => (
              <li key={item.step}>
                <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.28em] text-[var(--bp-amber)]">
                  {item.step}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--bp-mist)]">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-8 border-t border-[var(--bp-line)] bg-[var(--bp-panel)] px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl">
            Built for the whole report, not just a title
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--bp-mist)]">
            Authentication, CRUD, dashboard stats, and a personal library —
            everything you need to keep bugs from vanishing into chat threads.
          </p>
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((feature) => (
              <li
                key={feature.title}
                className="border-t border-[var(--bp-line)] pt-5"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl text-[var(--bp-leaf)]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--bp-mist)]">
                  {feature.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-[var(--bp-line)] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl">
            Everything a useful bug report holds
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--bp-mist)]">
            When you file a report in BugPocket, you are not stuck with a blank
            box. Each field is there so the fix later has less guesswork.
          </p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {reportFields.map((group) => (
              <div key={group.title}>
                <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--bp-amber)]">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[var(--bp-mist)]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--bp-leaf)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--bp-line)] bg-[var(--bp-panel-2)] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl tracking-tight md:text-5xl">
            Your workspace after you sign in
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--bp-mist)]">
            Three focused surfaces — no clutter, just the views that help you
            move bugs forward.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {surfaces.map((surface) => (
              <div
                key={surface.name}
                className="border-l-2 border-[var(--bp-leaf)] pl-5"
              >
                <h3 className="font-[family-name:var(--font-display)] text-2xl">
                  {surface.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[var(--bp-mist)]">
                  {surface.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--bp-line)] px-6 py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="max-w-xl">
            <BugPocketLogo className="mb-6 size-12 text-[var(--bp-leaf)]" />
            <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tight md:text-4xl">
              Ready when the next bug bites.
            </h2>
            <p className="mt-4 text-[var(--bp-mist)]">
              Create an account, open your dashboard, and log the first report
              with the context you will thank yourself for later.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="rounded-xl bg-[var(--bp-amber)] px-6 py-3 text-sm font-semibold text-[var(--bp-ink)] transition hover:bg-[var(--bp-leaf)]"
            >
              Create free account
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-[var(--bp-line)] px-6 py-3 text-sm font-medium transition hover:border-[var(--bp-leaf)] hover:text-[var(--bp-leaf)]"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--bp-line)] px-6 py-8 text-sm text-[var(--bp-mist)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="hover:text-[var(--bp-leaf)]">
            <BugPocketLogo withWordmark />
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-[var(--bp-leaf)]">
              About
            </Link>
            <Link href="/login" className="hover:text-[var(--bp-leaf)]">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-[var(--bp-leaf)]">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
