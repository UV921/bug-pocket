import { requireUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const user = await requireUser();
  const bugCount = await prisma.bug.count({ where: { userId: user.id } });

  return (
    <main className="space-y-8">
      <div>
        <p className="bp-eyebrow">Profile</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-tight">
          {user.username}
        </h1>
        <p className="mt-2 bp-muted">
          Account details for your BugPocket workspace.
        </p>
      </div>

      <dl className="bp-panel grid gap-4 p-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm bp-muted">Email</dt>
          <dd className="mt-1 font-medium">{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm bp-muted">Member since</dt>
          <dd className="mt-1 font-medium">
            {user.createdAt.toLocaleDateString()}
          </dd>
        </div>
        <div>
          <dt className="text-sm bp-muted">Bugs logged</dt>
          <dd className="mt-1 font-medium text-[var(--bp-leaf)]">{bugCount}</dd>
        </div>
      </dl>
    </main>
  );
}
