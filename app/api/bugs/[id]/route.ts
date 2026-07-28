import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { ACCESS_TOKEN_COOKIE } from "@/lib/cookies";
import { updateBugSchema } from "@/schemas/bug.schema";
import type { Severity, Status } from "@/lib/generated/prisma/client";

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

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const bug = await prisma.bug.findFirst({ where: { id, userId } });

  if (!bug) {
    return NextResponse.json({ message: "Bug not found" }, { status: 404 });
  }

  return NextResponse.json({ bug });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const existing = await prisma.bug.findFirst({ where: { id, userId } });
  if (!existing) {
    return NextResponse.json({ message: "Bug not found" }, { status: 404 });
  }

  const body = await request.json();
  const validated = updateBugSchema.safeParse({
    ...body,
    severity: body.severity
      ? (String(body.severity).toUpperCase() as Severity)
      : undefined,
    status: body.status
      ? (String(body.status).toUpperCase() as Status)
      : undefined,
  });

  if (!validated.success) {
    return NextResponse.json(
      { message: "Validation failed", errors: validated.error.issues },
      { status: 400 },
    );
  }

  const bug = await prisma.bug.update({
    where: { id },
    data: {
      ...validated.data,
      reference: validated.data.reference || null,
    },
  });

  return NextResponse.json({ bug });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const userId = getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const existing = await prisma.bug.findFirst({ where: { id, userId } });
  if (!existing) {
    return NextResponse.json({ message: "Bug not found" }, { status: 404 });
  }

  await prisma.bug.delete({ where: { id } });
  return NextResponse.json({ message: "Bug deleted" });
}
