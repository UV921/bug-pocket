"use server";

import { loginSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { comaparePassword, generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/session";
import {
  authActionError,
  type AuthActionResult,
} from "@/lib/auth-action-result";
import { prismaErrorMessage } from "@/lib/prisma-error-message";

export async function login(formdata: FormData): Promise<AuthActionResult> {
  try {
    const rawData = {
      email: formdata.get("email"),
      password: formdata.get("password"),
    };

    const validatedData = loginSchema.safeParse(rawData);
    if (!validatedData.success) {
      return {
        success: false,
        errors: validatedData.error.issues.map((err) => ({
          field: (err.path[0] ?? "form") as string | number,
          message: err.message,
        })),
      };
    }

    const { email, password } = validatedData.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return authActionError("email", "User not found");
    }

    const isPasswordValid = await comaparePassword(password, user.password);
    if (!isPasswordValid) {
      return authActionError("password", "Invalid password");
    }

    if (!process.env.JWT_SECRET_KEY) {
      return authActionError(
        "form",
        "Server auth is misconfigured (missing JWT_SECRET_KEY).",
      );
    }

    if (!process.env.DATABASE_URL) {
      return authActionError(
        "form",
        "Server database is misconfigured (missing DATABASE_URL).",
      );
    }

    const accessToken = generateToken(
      { userId: user.id, email: user.email },
      "15m",
    );
    const refreshToken = generateToken({ userId: user.id }, "7d");

    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    return authActionError("form", prismaErrorMessage(error));
  }
}
