import { requireUser } from "@/lib/session";
import { AppNav } from "@/components/app-nav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="bp-shell">
      <AppNav username={user.username} />
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
