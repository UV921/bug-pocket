"use client";

import { useState } from "react";
import { createEntry } from "@/action/entery";

export default function NewBugPage() {
  const [codeSnippet, setCodeSnippet] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("");
  const [attachmentName, setAttachmentName] = useState("");

  return (
    <main className="flex justify-center">
      <div className="bp-panel w-full max-w-4xl p-8 sm:p-10">
        <div className="mb-8 space-y-3">
          <p className="bp-eyebrow">Bug report</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight sm:text-4xl">
            Capture bug details, context, and solution notes.
          </h1>
          <p className="max-w-2xl text-base leading-7 bp-muted">
            Log reproduction steps, severity, environment, and attachments.
          </p>
        </div>

        <form action={createEntry} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="bp-label">
              Bug title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Example: App freezes when saving settings"
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
              required
              rows={4}
              placeholder="Describe what happened and the expected result."
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
              required
              rows={4}
              placeholder="List the steps required to reproduce the bug."
              className="bp-input min-h-28"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="severity" className="bp-label">
                Severity
              </label>
              <select
                id="severity"
                name="severity"
                defaultValue="medium"
                className="bp-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="environment" className="bp-label">
                Environment
              </label>
              <input
                id="environment"
                name="environment"
                type="text"
                placeholder="e.g. macOS 14, Chrome 125"
                className="bp-input"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="attachmentFile" className="bp-label">
                Attachment
              </label>
              {/* Only the filename is submitted — avoids 1MB Server Action body errors */}
              <input type="hidden" name="attachment" value={attachmentName} />
              <input
                id="attachmentFile"
                type="file"
                className="bp-input file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--bp-leaf)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[var(--bp-ink)]"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setAttachmentName(file?.name ?? "");
                }}
              />
              {attachmentName ? (
                <p className="text-xs bp-muted">Selected: {attachmentName}</p>
              ) : (
                <p className="text-xs bp-muted">
                  Filename is saved with the report (file upload storage comes later).
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="reference" className="bp-label">
                Reference link
              </label>
              <input
                id="reference"
                name="reference"
                type="url"
                placeholder="https://example.com/related-info"
                className="bp-input"
              />
            </div>
          </div>

          <div className="space-y-6 rounded-2xl border border-[var(--bp-line)] bg-[var(--bp-ink)]/60 p-6">
            <div className="grid gap-6 sm:grid-cols-[1fr_1.5fr]">
              <div className="space-y-2">
                <label htmlFor="codeLanguage" className="bp-label">
                  Code language
                </label>
                <input
                  id="codeLanguage"
                  name="codeLanguage"
                  type="text"
                  value={codeLanguage}
                  onChange={(event) => setCodeLanguage(event.target.value)}
                  placeholder="JavaScript, Python, SQL"
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
                  value={codeSnippet}
                  onChange={(event) => setCodeSnippet(event.target.value)}
                  className="bp-input min-h-28 font-mono"
                  placeholder="Paste the code snippet here..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="solution" className="bp-label">
              Proposed solution
            </label>
            <textarea
              id="solution"
              name="solution"
              rows={4}
              placeholder="Describe the fix, workaround, or next steps."
              className="bp-input min-h-28"
            />
          </div>

          <button type="submit" className="bp-btn w-full">
            Submit bug report
          </button>
        </form>
      </div>
    </main>
  );
}
