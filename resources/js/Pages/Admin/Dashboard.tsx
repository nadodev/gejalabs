import { Link } from "@inertiajs/react";
import { BookOpenText, BriefcaseBusiness, ClipboardList, FileText, FlaskConical, RadioTower, UserRound } from "lucide-react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import type { Task } from "@/types/admin";

interface DashboardProps {
  metrics: {
    personalProjects: number;
    professionalProjects: number;
    knowledgeItems: number;
    blogPosts: number;
    tasks: number;
    openTasks: number;
    aboutConfigured: boolean;
  };
  recentTasks: Task[];
}

const modules = [
  {
    title: "Projetos pessoais",
    description: "Projetos criados por voce, com links, repositorios, notas de arquitetura e aprendizados.",
    href: "/admin/personal-projects",
    icon: FlaskConical,
  },
  {
    title: "Projetos profissionais",
    description: "Experiencias em empresas sem expor codigo-fonte, dados privados ou credenciais internas.",
    href: "/admin/professional-projects",
    icon: BriefcaseBusiness,
  },
  {
    title: "Pagina sobre",
    description: "Introducao, principios, curriculo e timeline profissional exibidos na pagina publica Sobre.",
    href: "/admin/about",
    icon: UserRound,
  },
  {
    title: "Conhecimento",
    description: "Nos do grafo de conhecimento e timeline de evolucao exibidos na pagina publica Conhecimento.",
    href: "/admin/knowledge",
    icon: BookOpenText,
  },
  {
    title: "Blog",
    description: "Artigos, tutoriais, capas, tags e conteudo em Markdown para a area publica do site.",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    title: "Tarefas",
    description: "Tarefas tecnicas internas e notas do laboratorio. Visiveis apenas nesta area administrativa por enquanto.",
    href: "/admin/tasks",
    icon: ClipboardList,
  },
];

export default function Dashboard({ metrics, recentTasks }: DashboardProps) {
  return (
    <AdminLayout title="Painel" eyebrow="// sala de controle">
      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
        <section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric label="Pessoais" value={metrics.personalProjects} />
            <Metric label="Profissionais" value={metrics.professionalProjects} />
            <Metric label="Conhecimento" value={metrics.knowledgeItems} />
            <Metric label="Blog" value={metrics.blogPosts} />
            <Metric label="Tarefas" value={metrics.tasks} hint={`${metrics.openTasks} abertas`} />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {modules.map((module) => (
              <Link key={module.href} href={module.href} className="panel group p-5 transition-colors hover:border-primary/40">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center border border-border bg-surface text-primary transition-colors group-hover:border-primary/50">
                    <module.icon className="size-5" />
                  </span>
                  <div>
                    <div className="mono-label">modulo</div>
                    <h2 className="mt-1 font-display text-xl font-600">{module.title}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                    <div className="mt-4 font-mono text-xs text-primary">gerenciar -&gt;</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="mono-label">status do site</span>
              <RadioTower className="size-4 text-primary" />
            </div>
            <div className="mt-4 space-y-3 font-mono text-sm">
              <StatusLine label="Laravel" value="online" />
              <StatusLine label="Inertia" value="pronto" />
              <StatusLine label="Sobre" value={metrics.aboutConfigured ? "gerenciado" : "pendente"} />
              <StatusLine label="Admin" value="protegido" />
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <span className="mono-label">tarefas recentes</span>
              <Link href="/admin/tasks" className="font-mono text-xs text-primary hover:underline">
                abrir
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
                <p className="text-sm text-muted-foreground">Nenhuma tarefa interna ainda.</p>
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
