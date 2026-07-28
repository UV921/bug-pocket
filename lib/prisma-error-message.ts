import { Prisma } from "@/lib/generated/prisma/client";

export function prismaErrorMessage(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P1001":
        return "Cannot reach the database. Check DATABASE_URL on Vercel and use the Neon pooled connection string.";
      case "P2021":
        return "Database tables are missing. Run: bunx prisma migrate deploy";
      case "P2002":
        return "An account with this email already exists.";
      default:
        return `Database error (${error.code}). Check Vercel logs.`;
    }
  }

  if (error instanceof Error) {
    if (error.message.includes("DATABASE_URL is not set")) {
      return "DATABASE_URL is not set on the server. Add it in Vercel environment variables.";
    }
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
