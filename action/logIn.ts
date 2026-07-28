"use server";

import { loginSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { comaparePassword, generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/session";

export async function login(formdata: FormData) {
  const rawData = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };

  const validatedData = loginSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    };
  }

  const { email, password } = validatedData.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return {
      success: false,
      errors: [{ field: "email", message: "User not found" }],
    };
  }

  const isPasswordValid = await comaparePassword(password, user.password);
  if (!isPasswordValid) {
    return {
      success: false,
      errors: [{ field: "password", message: "Invalid password" }],
    };
  }

  if (!process.env.JWT_SECRET_KEY) {
    return {
      success: false,
      errors: [
        {
          field: "form",
          message: "Server auth is misconfigured (missing JWT_SECRET_KEY).",
        },
      ],
    };
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

  redirect("/dashboard");
}
