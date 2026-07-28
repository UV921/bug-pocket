"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  requireUserId,
} from "@/lib/session";
import { createBugSchema, updateBugSchema } from "@/schemas/bug.schema";
import type { Severity, Status } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";

function mapSeverity(value: string): Severity {
  return value.toUpperCase() as Severity;
}

export async function createEntry(formData: FormData) {
  const userId = await requireUserId();

  // Prefer filename-only field; fall back to File.name if a file was posted
  const attachmentField = formData.get("attachment");
  const attachmentName =
    typeof attachmentField === "string" && attachmentField.trim()
      ? attachmentField.trim()
      : attachmentField instanceof File && attachmentField.name
        ? attachmentField.name
        : undefined;

  const raw = {
    title: formData.get("title"),
    description: formData.get("description"),
    reproductionSteps: formData.get("steps") ?? formData.get("reproductionSteps"),
    severity: mapSeverity(String(formData.get("severity") ?? "medium")),
    environment: String(formData.get("environment") ?? "") || undefined,
    reference: String(formData.get("reference") ?? "") || undefined,
    codeSnippet: String(formData.get("codeSnippet") ?? "") || undefined,
    codingLanguage: String(formData.get("codeLanguage") ?? "") || undefined,
    solution: String(formData.get("solution") ?? "") || undefined,
    attachment: attachmentName,
  };

  const validated = createBugSchema.safeParse(raw);
  if (!validated.success) {
    redirect("/library/new");
  }

  const data = validated.data;

  await prisma.bug.create({
    data: {
      title: data.title,
      description: data.description,
      reproductionSteps: data.reproductionSteps,
      severity: data.severity,
      environment: data.environment,
      reference: data.reference || null,
      codeSnippet: data.codeSnippet,
      codingLanguage: data.codingLanguage,
      solution: data.solution,
      attachment: data.attachment,
      userId,
    },
  });

  revalidatePath("/library");
  revalidatePath("/dashboard");
  redirect("/library");
}

export async function updateBug(bugId: string, formData: FormData) {
  const userId = await requireUserId();

  const existing = await prisma.bug.findFirst({
    where: { id: bugId, userId },
  });
  if (!existing) {
    redirect("/library");
  }

  const raw = {
    title: formData.get("title") ?? undefined,
    description: formData.get("description") ?? undefined,
    reproductionSteps:
      formData.get("steps") ?? formData.get("reproductionSteps") ?? undefined,
    severity: formData.get("severity")
      ? mapSeverity(String(formData.get("severity")))
      : undefined,
    status: formData.get("status")
      ? (String(formData.get("status")).toUpperCase() as Status)
      : undefined,
    environment: formData.get("environment")
      ? String(formData.get("environment"))
      : undefined,
    reference: formData.get("reference")
      ? String(formData.get("reference"))
      : undefined,
    codeSnippet: formData.get("codeSnippet")
      ? String(formData.get("codeSnippet"))
      : undefined,
    codingLanguage: formData.get("codeLanguage")
      ? String(formData.get("codeLanguage"))
      : undefined,
    solution: formData.get("solution")
      ? String(formData.get("solution"))
      : undefined,
  };

  const validated = updateBugSchema.safeParse(raw);
  if (!validated.success) {
    redirect(`/library/${bugId}`);
  }

  await prisma.bug.update({
    where: { id: bugId },
    data: {
      ...validated.data,
      reference: validated.data.reference || null,
    },
  });

  revalidatePath("/library");
  revalidatePath(`/library/${bugId}`);
  revalidatePath("/dashboard");
  redirect(`/library/${bugId}`);
}

export async function deleteBug(bugId: string) {
  const userId = await requireUserId();

  const existing = await prisma.bug.findFirst({
    where: { id: bugId, userId },
  });
  if (!existing) {
    redirect("/library");
  }

  await prisma.bug.delete({ where: { id: bugId } });

  revalidatePath("/library");
  revalidatePath("/dashboard");
  redirect("/library");
}

export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  redirect("/");
}
