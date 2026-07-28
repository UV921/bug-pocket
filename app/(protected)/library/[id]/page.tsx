import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { deleteBug } from "@/action/entery";

type PageProps = {
  params: Promise<{ id: string }>;
};

const severityStyles: Record<string, string> = {
  LOW: "bg-[rgba(61,139,110,0.2)] text-[var(--bp-leaf)]",
  MEDIUM: "bg-[rgba(232,168,56,0.18)] text-[var(--bp-amber)]",
  HIGH: "bg-[rgba(232,120,56,0.2)] text-[#f0a060]",
  CRITICAL: "bg-[rgba(225,90,90,0.2)] text-[#f08080]",
};

function formatLabel(value: string) {
  return value.replaceAll("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 border-t border-[var(--bp-line)] pt-8">
      <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--bp-leaf)]">
        {title}
      </h2>
      <div className="text-base leading-8 text-[var(--bp-mist)]">{children}</div>
    </section>
  );
}

function Prose({ text }: { text: string }) {
  const paragraphs = text
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) {
    return <p className="italic opacity-70">No details provided.</p>;
  }

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</p>
      ))}
    </div>
  );
}

function StepList({ text }: { text: string }) {
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return <p className="italic opacity-70">No steps recorded.</p>;
  }

  return (
    <ol className="space-y-3">
      {lines.map((line, index) => (
        <li key={`${index}-${line.slice(0, 12)}`} className="flex gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[rgba(61,139,110,0.2)] text-xs font-semibold text-[var(--bp-leaf)]">
            {index + 1}
          </span>
          <span className="leading-7">{line.replace(/^\d+[\).\-\s]*/, "")}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function BugDetailPage({ params }: PageProps) {
  const userId = await requireUserId();
  const { id } = await params;

  const bug = await prisma.bug.findFirst({ where: { id, userId } });
  if (!bug) notFound();

  const deleteAction = deleteBug.bind(null, bug.id);
  const updatedLabel = bug.updatedAt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const createdLabel = bug.createdAt.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <main className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/library" className="text-sm text-[var(--bp-leaf)] hover:underline">
          ← Back to library
        </Link>
        <div className="flex flex-wrap gap-2">
          <Link href={`/library/${bug.id}/edit`} className="bp-btn-ghost !py-2 !text-sm">
            Edit report
          </Link>
          <form action={deleteAction}>
            <button
              type="submit"
              className="rounded-xl border border-[rgba(225,90,90,0.45)] px-4 py-2 text-sm text-[#f08080] transition hover:bg-[rgba(225,90,90,0.12)]"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <article className="bp-panel space-y-8 p-8 sm:p-10">
        <header className="space-y-5">
          <p className="bp-eyebrow">Bug report</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight sm:text-5xl">
            {bug.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            <span className={`rounded-md px-2.5 py-1 ${severityStyles[bug.severity]}`}>
              {formatLabel(bug.severity)} severity
            </span>
            <span className="rounded-md bg-[rgba(183,199,190,0.12)] px-2.5 py-1 text-[var(--bp-mist)]">
              {formatLabel(bug.status)}
            </span>
          </div>

          <p className="text-sm bp-muted">
            Logged {createdLabel}
            {bug.updatedAt.getTime() !== bug.createdAt.getTime()
              ? ` · Updated ${updatedLabel}`
              : null}
          </p>
        </header>

        <Section title="What happened">
          <Prose text={bug.description} />
        </Section>

        <Section title="How to reproduce">
          <StepList text={bug.reproductionSteps} />
        </Section>

        {(bug.environment || bug.reference || bug.attachment) && (
          <Section title="Context">
            <dl className="grid gap-4 sm:grid-cols-2">
              {bug.environment ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-[var(--bp-amber)]">
                    Environment
                  </dt>
                  <dd className="mt-2 leading-7 text-[var(--bp-paper)]">
                    {bug.environment}
                  </dd>
                </div>
              ) : null}
              {bug.attachment ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-[var(--bp-amber)]">
                    Attachment
                  </dt>
                  <dd className="mt-2 leading-7 text-[var(--bp-paper)]">
                    {bug.attachment}
                  </dd>
                </div>
              ) : null}
              {bug.reference ? (
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-[0.2em] text-[var(--bp-amber)]">
                    Reference
                  </dt>
                  <dd className="mt-2">
                    <a
                      href={bug.reference}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-[var(--bp-leaf)] underline underline-offset-2"
                    >
                      {bug.reference}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </Section>
        )}

        {(bug.codeSnippet || bug.codingLanguage) && (
          <Section title="Code">
            {bug.codingLanguage ? (
              <p className="mb-3 text-sm text-[var(--bp-amber)]">
                Language: {bug.codingLanguage}
              </p>
            ) : null}
            {bug.codeSnippet ? (
              <pre className="overflow-x-auto rounded-2xl border border-[var(--bp-line)] bg-[var(--bp-ink)]/70 p-5 font-mono text-sm leading-7 text-[var(--bp-paper)]">
                <code>{bug.codeSnippet}</code>
              </pre>
            ) : (
              <p className="italic opacity-70">No snippet attached.</p>
            )}
          </Section>
        )}

        <Section title="Proposed solution">
          {bug.solution ? (
            <Prose text={bug.solution} />
          ) : (
            <p className="italic opacity-70">
              No solution notes yet. Add one when you edit this report.
            </p>
          )}
        </Section>
      </article>
    </main>
  );
}
