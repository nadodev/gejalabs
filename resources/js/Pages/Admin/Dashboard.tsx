import { Link } from "@inertiajs/react";
import { BookOpenText, BriefcaseBusiness, ClipboardList, FlaskConical, RadioTower, UserRound } from "lucide-react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import type { Task } from "@/types/admin";

interface DashboardProps {
  metrics: {
    personalProjects: number;
    professionalProjects: number;
    knowledgeItems: number;
    tasks: number;
    openTasks: number;
    aboutConfigured: boolean;
  };
  recentTasks: Task[];
}

const modules = [
  {
    title: "Personal projects",
    description: "Projects created by you, with links, repositories, architecture notes and learnings.",
    href: "/admin/personal-projects",
    icon: FlaskConical,
  },
  {
    title: "Professional projects",
    description: "Company experience without exposing source code, private data or internal credentials.",
    href: "/admin/professional-projects",
    icon: BriefcaseBusiness,
  },
  {
    title: "About page",
    description: "Intro, principles, resume upload and the professional timeline shown on the public About page.",
    href: "/admin/about",
    icon: UserRound,
  },
  {
    title: "Knowledge",
    description: "Managed knowledge graph nodes and the evolution timeline shown on the public Knowledge page.",
    href: "/admin/knowledge",
    icon: BookOpenText,
  },
  {
    title: "Tasks",
    description: "Internal technical tasks and notes for the lab. Visible only inside this admin area for now.",
    href: "/admin/tasks",
    icon: ClipboardList,
  },
];

export default function Dashboard({ metrics, recentTasks }: DashboardProps) {
  return (
    <AdminLayout title="Dashboard" eyebrow="// control room">
      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
        <section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Personal" value={metrics.personalProjects} />
            <Metric label="Professional" value={metrics.professionalProjects} />
            <Metric label="Knowledge" value={metrics.knowledgeItems} />
            <Metric label="Tasks" value={metrics.tasks} hint={`${metrics.openTasks} open`} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <Link key={module.href} href={module.href} className="panel group p-5 transition-colors hover:border-primary/40">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center border border-border bg-surface text-primary transition-colors group-hover:border-primary/50">
                    <module.icon className="size-5" />
                  </span>
                  <div>
                    <div className="mono-label">module</div>
                    <h2 className="mt-1 font-display text-xl font-600">{module.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                    <div className="mt-4 font-mono text-xs text-primary">manage -&gt;</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="mono-label">site status</span>
              <RadioTower className="size-4 text-primary" />
            </div>
            <div className="mt-4 space-y-3 font-mono text-sm">
              <StatusLine label="Laravel" value="online" />
              <StatusLine label="Inertia" value="ready" />
              <StatusLine label="About" value={metrics.aboutConfigured ? "managed" : "pending"} />
              <StatusLine label="Admin" value="protected" />
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="mono-label">recent tasks</span>
              <Link href="/admin/tasks" className="font-mono text-xs text-primary hover:underline">
                open
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {recentTasks.length ? (
                recentTasks.map((task) => (
                  <div key={task.id} className="border border-border bg-surface/40 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-xs text-foreground">{task.title}</div>
                      <div className="font-mono text-[0.65rem] text-primary">{task.status}</div>
                    </div>
                    {task.description ? <div className="mt-1 line-clamp-2 text-sm text-muted-foreground">{task.description}</div> : null}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No internal tasks yet.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </AdminLayout>
  );
}

function Metric({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div className="panel p-4">
      <div className="mono-label">{label}</div>
      <div className="mt-2 font-display text-3xl font-700 text-primary">{String(value).padStart(2, "0")}</div>
      {hint ? <div className="mt-1 font-mono text-[0.65rem] text-muted-foreground">{hint}</div> : null}
    </div>
  );
}

function StatusLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary">{value}</span>
    </div>
  );
}
