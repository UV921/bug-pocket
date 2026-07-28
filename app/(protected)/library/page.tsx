import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import type { Prisma } from "@/lib/generated/prisma/client";

const severityStyles: Record<string, string> = {
  LOW: "bg-[rgba(61,139,110,0.2)] text-[var(--bp-leaf)]",
  MEDIUM: "bg-[rgba(232,168,56,0.18)] text-[var(--bp-amber)]",
  HIGH: "bg-[rgba(232,120,56,0.2)] text-[#f0a060]",
  CRITICAL: "bg-[rgba(225,90,90,0.2)] text-[#f08080]",
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function LibraryPage({ searchParams }: PageProps) {
  const userId = await requireUserId();
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const where: Prisma.BugWhereInput = {
    userId,
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { reproductionSteps: { contains: query, mode: "insensitive" } },
            { environment: { contains: query, mode: "insensitive" } },
            { solution: { contains: query, mode: "insensitive" } },
            { codingLanguage: { contains: query, mode: "insensitive" } },
            { attachment: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const bugs = await prisma.bug.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="bp-eyebrow">Library</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            All bug reports
          </h1>
          <p className="mt-2 bp-muted">
            Browse, open, and manage every issue you have logged.
          </p>
        </div>
        <Link href="/library/new" className="bp-btn">
          New bug
        </Link>
      </div>

      <form action="/library" method="get" className="flex flex-wrap gap-3">
        <label htmlFor="q" className="sr-only">
          Search bugs
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search title, description, environment, solution…"
          className="bp-input min-w-[16rem] flex-1"
        />
        <button type="submit" className="bp-btn">
          Search
        </button>
        {query ? (
          <Link href="/library" className="bp-btn-ghost">
            Clear
          </Link>
        ) : null}
      </form>

      {query ? (
        <p className="text-sm bp-muted">
          {bugs.length === 0
            ? `No results for “${query}”.`
            : `${bugs.length} result${bugs.length === 1 ? "" : "s"} for “${query}”.`}
        </p>
      ) : null}

      {bugs.length === 0 && !query ? (
        <p className="bp-panel border-dashed px-5 py-12 text-center bp-muted">
          Your library is empty.{" "}
          <Link href="/library/new" className="text-[var(--bp-leaf)] underline">
            Create the first report
          </Link>
          .
        </p>
      ) : bugs.length === 0 ? (
        <p className="bp-panel border-dashed px-5 py-12 text-center bp-muted">
          Try a different keyword, or{" "}
          <Link href="/library" className="text-[var(--bp-leaf)] underline">
            view all bugs
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-4">
          {bugs.map((bug) => (
            <li key={bug.id}>
              <Link
                href={`/library/${bug.id}`}
                className="bp-panel block px-5 py-5 transition hover:border-[var(--bp-leaf)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold">{bug.title}</h2>
                    <p className="line-clamp-2 text-sm bp-muted">
                      {bug.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span
                      className={`rounded-md px-2 py-1 ${severityStyles[bug.severity]}`}
                    >
                      {bug.severity}
                    </span>
                    <span className="rounded-md bg-[rgba(183,199,190,0.12)] px-2 py-1 text-[var(--bp-mist)]">
                      {bug.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
