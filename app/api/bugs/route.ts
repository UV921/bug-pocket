import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { ACCESS_TOKEN_COOKIE } from "@/lib/cookies";
import { createBugSchema } from "@/schemas/bug.schema";
import type { Severity } from "@/lib/generated/prisma/client";

type TokenPayload = {
  userId?: string;
  userID?: string;
};

function getUserIdFromRequest(request: NextRequest): string | null {
  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) return null;
  const decoded = verifyToken(token) as TokenPayload | null;
  if (!decoded) return null;
  return decoded.userId ?? decoded.userID ?? null;
}

export async function GET(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const bugs = await prisma.bug.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ bugs });
}

export async function POST(request: NextRequest) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validated = createBugSchema.safeParse({
    ...body,
    severity: String(body.severity ?? "MEDIUM").toUpperCase() as Severity,
  });

  if (!validated.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validated.error.issues },
      { status: 400 },
    );
  }

  const data = validated.data;
  const bug = await prisma.bug.create({
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

  return NextResponse.json({ bug }, { status: 201 });
}
