import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();

  const [total, open, critical, recent] = await Promise.all([
    prisma.bug.count({ where: { userId: user.id } }),
    prisma.bug.count({ where: { userId: user.id, status: "OPEN" } }),
    prisma.bug.count({
      where: { userId: user.id, severity: "CRITICAL" },
    }),
    prisma.bug.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    { label: "Total bugs", value: total },
    { label: "Open", value: open },
    { label: "Critical", value: critical },
  ];

  return (
    <main className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="bp-eyebrow">Dashboard</p>
          <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
            Welcome back, {user.username}
          </h1>
          <p className="mt-2 max-w-xl bp-muted">
            Track severity, status, and recent reports in one place.
          </p>
        </div>
        <Link href="/library/new" className="bp-btn">
          Report a bug
        </Link>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="bp-panel px-5 py-6">
            <p className="text-sm bp-muted">{stat.label}</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--bp-leaf)]">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-2xl">
            Recent bugs
          </h2>
          <Link href="/library" className="text-sm text-[var(--bp-leaf)] hover:underline">
            View library
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="bp-panel border-dashed px-5 py-10 bp-muted">
            No bugs yet. Capture your first report from the library.
          </p>
        ) : (
          <ul className="bp-panel divide-y divide-[var(--bp-line)] overflow-hidden">
            {recent.map((bug) => (
              <li key={bug.id}>
                <Link
                  href={`/library/${bug.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition hover:bg-[var(--bp-panel-2)]"
                >
                  <div>
                    <p className="font-medium">{bug.title}</p>
                    <p className="text-sm bp-muted">
                      {bug.status.replace("_", " ")} · {bug.severity}
                    </p>
                  </div>
                  <time className="text-xs bp-muted">
                    {bug.createdAt.toLocaleDateString()}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
