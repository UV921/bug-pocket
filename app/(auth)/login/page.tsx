"use client";

import { useForm } from "react-hook-form";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/action/logIn";
import type { z } from "zod";

type RegisterFormValues = z.infer<typeof loginSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    const formData = new FormData();
 
    formData.append("email", data.email);
    formData.append("password", data.password);
    await login(formData);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="w-full max-w-md rounded-[2rem] border border-border/80 bg-card/95 p-8 shadow-lg shadow-black/5">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Welcome Back!</p>
          <h1 className="text-2xl font-semibold">Login</h1>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(form.formState.errors.email)}
              className="w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              aria-invalid={Boolean(form.formState.errors.password)}
              className="w-full rounded-2xl border border-input bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.formState.isSubmitting ? "Creating account..." : "Sign up"}
          </button>
        </form>
      </div>
    </main>
  );
}
