"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createEntry } from "@/action/entery";

export default function NewBug() {
  const [codeSnippet, setCodeSnippet] = useState("");
 const [codeLanguage, setCodeLanguage] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-16">
      <Card className="w-full max-w-4xl rounded-[2rem] border border-border/80 bg-card/95 shadow-lg shadow-black/5 backdrop-blur-xl">
        <CardHeader className="px-8 pt-10 pb-6 sm:px-10">
          <div className="space-y-4">
            <div className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
              Bug report
            </div>
            <CardTitle className="text-3xl font-semibold leading-tight sm:text-4xl">
              Capture bug details, context, and solution notes.
            </CardTitle>
            <CardDescription className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Use this form to log a bug with reproduction steps, severity, environment, and attachments.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-10 sm:px-10">
          <form action={createEntry} method="post" encType="multipart/form-data" className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="title">Bug title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Example: App freezes when saving settings"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe what happened, the steps to reproduce it, and the expected result."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="steps">Reproduction steps</Label>
              <Textarea
                id="steps"
                name="steps"
                placeholder="List the steps required to reproduce the bug."
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select name="severity" defaultValue="medium">
                  <SelectTrigger id="severity" className="w-full">
                    <SelectValue placeholder="Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Severity</SelectLabel>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Input
                  id="environment"
                  name="environment"
                  type="text"
                  placeholder="e.g. macOS 14, Chrome 125"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
              <div className="space-y-2">
                <Label htmlFor="attachment">Attachment</Label>
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm text-foreground outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:text-primary-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reference">Reference link</Label>
                <Input
                  id="reference"
                  name="reference"
                  type="url"
                  placeholder="https://example.com/related-info"
                />
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-border/80 bg-slate-950 p-6 text-slate-50 shadow-inner">
              <div className="grid gap-6 sm:grid-cols-[1fr_1.5fr]">
                <div className="space-y-2">
                  <Label htmlFor="codeLanguage">Code language</Label>
                  <Input
                    id="codeLanguage"
                    name="codeLanguage"
                    type="text"
                    value={codeLanguage}
                    onChange={(event) => setCodeLanguage(event.target.value)}
                    placeholder="JavaScript, Python, SQL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codeSnippet">Code snippet</Label>
                  <Textarea
                    id="codeSnippet"
                    name="codeSnippet"
                    value={codeSnippet}
                    onChange={(event) => setCodeSnippet(event.target.value)}
                    className="font-mono bg-slate-950 text-slate-100"
                    placeholder="Paste the code snippet here..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">Proposed solution</Label>
              <Textarea
                id="solution"
                name="solution"
                placeholder="Describe the fix, workaround, or next steps."
              />
            </div>

            <Button type="submit" className="w-full">
              Submit bug report
                </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
