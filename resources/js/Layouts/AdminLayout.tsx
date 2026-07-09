import { Head, Link, router, usePage } from "@inertiajs/react";
import {
  BookOpenText,
  BriefcaseBusiness,
  FlaskConical,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Monitor,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import type { SharedPageProps } from "@/types/page";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/personal-projects", label: "Personal projects", icon: FlaskConical },
  { href: "/admin/professional-projects", label: "Professional projects", icon: BriefcaseBusiness },
  { href: "/admin/about", label: "About", icon: UserRound },
  { href: "/admin/knowledge", label: "Knowledge", icon: BookOpenText },
  { href: "/admin/tasks", label: "Tasks", icon: ListTodo },
];

export function AdminLayout({
  title,
  eyebrow = "// admin",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  const { auth, flash } = usePage<SharedPageProps>().props;
  const currentUrl = usePage().url;

  function logout() {
    router.post("/logout");
  }

  return (
    <>
      <Head title={title} />
      <main className="min-h-screen bg-background text-foreground">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background/95 lg:block">
          <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
            <span className="grid size-9 place-items-center border border-primary/40 bg-surface text-primary shadow-neon">
              <Monitor className="size-4" />
            </span>
            <span className="font-display text-lg font-700">
              GEJA<span className="text-primary">ADMIN</span>
            </span>
          </div>
          <nav className="space-y-1 p-3">
            {nav.map((item) => {
              const active = currentUrl === item.href || currentUrl.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 border px-3 py-2.5 font-mono text-xs transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-neon"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="lg:pl-72">
          <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-5">
              <div>
                <div className="mono-label">{eyebrow}</div>
                <div className="font-display text-lg font-600">{title}</div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="hidden border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary sm:inline-flex"
                >
                  view site
                </Link>
                <div className="hidden text-right sm:block">
                  <div className="font-mono text-xs text-foreground">{auth.user?.name}</div>
                  <div className="font-mono text-[0.65rem] text-muted-foreground">{auth.user?.email}</div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="grid size-9 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  aria-label="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-1 overflow-x-auto border-t border-border p-2 lg:hidden">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="shrink-0 border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </header>

          <div className="px-5 py-8">
            {flash.success ? (
              <div className="mb-5 border border-primary bg-primary/10 px-4 py-3 font-mono text-sm text-primary">
                {flash.success}
              </div>
            ) : null}
            {flash.error ? (
              <div className="mb-5 border border-destructive bg-destructive/10 px-4 py-3 font-mono text-sm text-destructive">
                {flash.error}
              </div>
            ) : null}
            {children}
          </div>
        </section>
      </main>
    </>
  );
}
