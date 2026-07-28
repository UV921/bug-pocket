import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/session";
import { updateBug } from "@/action/entery";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBugPage({ params }: PageProps) {
  const userId = await requireUserId();
  const { id } = await params;

  const bug = await prisma.bug.findFirst({ where: { id, userId } });
  if (!bug) notFound();

  const updateAction = updateBug.bind(null, bug.id);

  return (
    <main className="mx-auto max-w-3xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/library/${bug.id}`}
          className="text-sm text-[var(--bp-leaf)] hover:underline"
        >
          ← Back to report
        </Link>
      </div>

      <div>
        <p className="bp-eyebrow">Edit report</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
          {bug.title}
        </h1>
        <p className="mt-2 bp-muted">Update the fields below, then save.</p>
      </div>

      <form action={updateAction} className="bp-panel space-y-6 p-6 sm:p-8">
        <div className="space-y-2">
          <label htmlFor="title" className="bp-label">
            Title
          </label>
          <input
            id="title"
            name="title"
            defaultValue={bug.title}
            required
            className="bp-input"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="bp-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={bug.description}
            required
            rows={4}
            className="bp-input min-h-28"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="steps" className="bp-label">
            Reproduction steps
          </label>
          <textarea
            id="steps"
            name="steps"
            defaultValue={bug.reproductionSteps}
            required
            rows={4}
            className="bp-input min-h-28"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="severity" className="bp-label">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              defaultValue={bug.severity}
              className="bp-input"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="bp-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={bug.status}
              className="bp-input"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="environment" className="bp-label">
              Environment
            </label>
            <input
              id="environment"
              name="environment"
              defaultValue={bug.environment ?? ""}
              className="bp-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="reference" className="bp-label">
              Reference
            </label>
            <input
              id="reference"
              name="reference"
              type="url"
              defaultValue={bug.reference ?? ""}
              className="bp-input"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="codeLanguage" className="bp-label">
              Code language
            </label>
            <input
              id="codeLanguage"
              name="codeLanguage"
              defaultValue={bug.codingLanguage ?? ""}
              className="bp-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="codeSnippet" className="bp-label">
              Code snippet
            </label>
            <textarea
              id="codeSnippet"
              name="codeSnippet"
              className="bp-input min-h-28 font-mono"
              defaultValue={bug.codeSnippet ?? ""}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="solution" className="bp-label">
            Proposed solution
          </label>
          <textarea
            id="solution"
            name="solution"
            defaultValue={bug.solution ?? ""}
            rows={4}
            className="bp-input min-h-28"
          />
        </div>

        {bug.attachment ? (
          <p className="text-sm bp-muted">Attachment on file: {bug.attachment}</p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="bp-btn">
            Save changes
          </button>
          <Link href={`/library/${bug.id}`} className="bp-btn-ghost">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
