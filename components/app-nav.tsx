import Link from "next/link";
import { logout } from "@/action/entery";
import { BugPocketLogo } from "@/components/bugpocket-logo";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library", label: "Library" },
  { href: "/library/new", label: "New bug" },
  { href: "/profile", label: "Profile" },
];

export function AppNav({ username }: { username: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--bp-line)] bg-[var(--bp-panel)]/80 text-[var(--bp-text)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/dashboard"
          className="transition hover:text-[var(--bp-leaf)]"
        >
          <BugPocketLogo withWordmark />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[var(--bp-mist)] md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-[var(--bp-leaf)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <ThemeToggle />
          <span className="hidden text-[var(--bp-mist)] sm:inline">{username}</span>
          <form action={logout}>
            <button
              type="submit"
              className="bp-btn-ghost !px-3 !py-1.5"
            >
              Log out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
