"use server";

import { registerSchema } from "@/schemas/auth.schema";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/lib/session";

export async function register(formdata: FormData) {
  const rawData = {
    username: formdata.get("username"),
    password: formdata.get("password"),
    email: formdata.get("email"),
  };

  const validatedData = registerSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    };
  }

  const { username, password, email } = validatedData.data;

  if (await prisma.user.findUnique({ where: { email } })) {
    return {
      success: false,
      errors: [{ field: "email", message: "User already exists" }],
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

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  });

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

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  redirect("/dashboard");
}
