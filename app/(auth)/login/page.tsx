"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/action/logIn";
import { applyAuthActionResult } from "@/lib/handle-auth-action-result";
import type { z } from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setFormError(null);
    form.clearErrors();

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await login(formData);
    if (applyAuthActionResult(result, form, setFormError, ["email", "password"])) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <main className="w-full">
      <div className="bp-panel p-8">
        <div className="mb-6 space-y-2">
          <p className="bp-eyebrow">Welcome back</p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl tracking-tight">
            Log in
          </h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {formError ? (
            <p className="rounded-xl border border-[rgba(225,90,90,0.4)] bg-[rgba(225,90,90,0.12)] px-4 py-3 text-sm text-[#f08080]">
              {formError}
            </p>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="email" className="bp-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(form.formState.errors.email)}
              className="bp-input"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-[#f08080]">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="bp-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              aria-invalid={Boolean(form.formState.errors.password)}
              className="bp-input"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-[#f08080]">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bp-btn w-full"
          >
            {form.formState.isSubmitting ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm bp-muted">
          No account yet?{" "}
          <Link href="/signup" className="text-[var(--bp-leaf)] underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
